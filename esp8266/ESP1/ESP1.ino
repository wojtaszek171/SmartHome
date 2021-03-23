#include <NTPClient.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

/* define constants of various pins for easy accessibility */
#define RELAY1 D0
#define RELAY2 D5
#define RELAY3 D6
#define RELAY4 D7

#define RELAYFEED D4
#define THERMOMETER D3

OneWire oneWire(THERMOMETER);
DallasTemperature tempSensors(&oneWire);
Adafruit_BME280 bme;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

/* Enter ssid & password of your WiFi inside double quotes */
const char *ssid = ""; //ENTER WIFI SSID
const char *password = ""; //ENTER WIFI PASSWORD

String serverName = ""; //PUT YOUR API DOMAIN
String apiKeyValue = ""; //ENTER API KEY

unsigned long previousMillisFetch = 0;
unsigned long previousMillisSensor = 0;
const long dbFetchInterval = 10000;
const long sensorFetchInterval = 5000;

String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

class Socket {
  private:
    byte pin;
    bool enabled;
    String start;
    String stop;
    bool isEarlier(int h1, int m1, int h2, int m2){
      if (h1 < h2)
      {
          return true;
      }
      else if (h1 == h2)
      {
          if (m1 < m2)
          {
              return true;
          }
      }
      return false;
    };
  public:
    Socket(byte pin) {
      this->pin = pin;
      this->enabled = false;
      this->start = "";
      this->stop = "";
      init();
    }
    void init() {
      pinMode(pin, OUTPUT);
      digitalWrite(pin, HIGH);
    }
    void on() {
      digitalWrite(pin, LOW);
    }
    void off() {
      digitalWrite(pin, HIGH);
    }
    void setTimes(bool _enabled, char* _start, char* _stop) {
      enabled = _enabled;
      start = _start;
      stop = _stop;
    }
    byte getPin() {
      return pin;
    }
    String getStart() {
      return start;
    }
    String getStop() {
      return stop;
    }
    bool getEnabled() {
      return enabled;
    }
    int getPinState() {
      return digitalRead(pin);
    }
    void handleCurrentTime(char* currentTime) {
      if (enabled) {
        if (start == "" || stop == "") {
          on();
          return;
        }
        int currH = getValue(currentTime,':',0).toInt();
        int currM = getValue(currentTime,':',1).toInt();

        int startH = getValue(start,':',0).toInt();
        int startM = getValue(start,':',1).toInt();
        int stopH = getValue(stop,':',0).toInt();
        int stopM = getValue(stop,':',1).toInt();

        if (isEarlier(stopH, stopM, startH, startM)) {
          if (!(isEarlier(currH, currM, startH, startM) && !isEarlier(currH, currM, stopH, stopM))){
            on();
          } else {
            off();
          }
        } else {
          if (!isEarlier(currH, currM, startH, startM) && isEarlier(currH, currM, stopH, stopM)){
            on();
          } else {
            off();
          }
        }
      } else {
        off();
      }
    }
};

Socket socket1(RELAY1);
Socket socket2(RELAY2);
Socket socket3(RELAY3);
Socket socket4(RELAY4);

void fetchSockets() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName + "getSockets.php");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String httpRequestData = "api_key=" + apiKeyValue + "";
    int httpCode = http.POST(httpRequestData);
    if (httpCode > 0) { //Check the returning code
      DynamicJsonDocument doc(2048);
      char* char_arr;
      String str_obj(http.getString());
      char_arr = &str_obj[0];
      DeserializationError error = deserializeJson(doc, char_arr);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
      }
      for (int i = 0; i < doc.size(); i++) {
        JsonObject obj = doc[i];
        const char* socketKey = obj["key"];
        const char* socketStart = obj["start"];
        const char* socketStop = obj["stop"];
        const int socketEnabled = obj["enabled"];
        const char *s1 = "socket1";
        const char *s2 = "socket2";
        const char *s3 = "socket3";
        const char *s4 = "socket4";

        if (strcmp (socketKey, s1) == 0) {
          socket1.setTimes(socketEnabled, (char*)socketStart, (char*)socketStop);
        } else if (strcmp (socketKey, s2) == 0) {
          socket2.setTimes(socketEnabled, (char*)socketStart, (char*)socketStop);
        } else if (strcmp (socketKey, s3) == 0) {
          socket3.setTimes(socketEnabled, (char*)socketStart, (char*)socketStop);
        } else if (strcmp (socketKey, s4) == 0) {
          socket4.setTimes(socketEnabled, (char*)socketStart, (char*)socketStop);
        }
      }
    } else {
      Serial.print("Error code: ");
      Serial.println(httpCode);
    }
    http.end();   //Close connection
  }
}

void setSensor(char* name, float value) {
  HTTPClient http;
  http.begin(serverName + "setSensor.php");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String httpRequestData = "api_key=" + apiKeyValue + "&name=" + name + "&value=" + value + "";
  int httpCode = http.POST(httpRequestData);

  if (httpCode <= 0) {
    Serial.print("Error code: ");
    Serial.println(httpCode);
  }
}

int intLength( int N )
{
   if      ( N < 0  ) return 1 + intLength( -N );
   else if ( N < 10 ) return 1;
   else               return 1 + intLength( N / 10 );
}

void readSensors() {
  tempSensors.requestTemperatures();
  float waterTemp = tempSensors.getTempCByIndex(0);
  float roomTemp = bme.readTemperature();
  float roomHumidity = bme.readHumidity();
  float roomPressure = bme.readPressure() / 100;

  setSensor("waterTemp", waterTemp);
  setSensor("roomTemp", roomTemp);
  setSensor("roomHumidity", roomHumidity);
  setSensor("pressure", roomPressure);
}

void feed() {
  digitalWrite(RELAYFEED, LOW);
  delay(100);
  digitalWrite(RELAYFEED, HIGH);
}

void setSocketsState() {
  int currentHour = timeClient.getHours();
  int currentMinute = timeClient.getMinutes();
  char liveHour[10];
  char liveMinutes[10];
  itoa(currentHour, liveHour, 10);
  itoa(currentMinute, liveMinutes, 10);

  char dest[24] = "";
  if (intLength(currentHour) == 1) {
    strcat(dest, "0");
  }
  
  strcat(dest, liveHour);
  strcat(dest, ":");
  if (intLength(currentMinute) == 1) {
    strcat(dest, "0");
  }
  strcat(dest, liveMinutes);

  char* dateToCompare = dest;
  socket1.handleCurrentTime(dateToCompare);
  socket2.handleCurrentTime(dateToCompare);
  socket3.handleCurrentTime(dateToCompare);
  socket4.handleCurrentTime(dateToCompare);
}

/* This function helps initialize program and set initial values */
void setup(void)
{
  digitalWrite(THERMOMETER, HIGH);
  pinMode(RELAYFEED, OUTPUT);
  digitalWrite(RELAYFEED, HIGH);
  Serial.begin(9600);
  delay(100);
  tempSensors.begin();
  bme.begin(0x76);
  delay(10);
  WiFi.begin(ssid, password); /* connect to WiFi */

  /* Display progress dots on serial monitor till WiFi is connected */
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  timeClient.begin();
  timeClient.setTimeOffset(3600);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop(void)
{
  timeClient.update();
  unsigned long currentMillisFetch = millis();
  unsigned long currentMillisSensor = millis();

  if (currentMillisFetch - previousMillisFetch >= dbFetchInterval) {
    previousMillisFetch = currentMillisFetch;
    fetchSockets();
    setSocketsState();
  }

  if (currentMillisSensor - previousMillisSensor >= sensorFetchInterval) {
    previousMillisSensor = currentMillisSensor;
    readSensors();
  }
}
