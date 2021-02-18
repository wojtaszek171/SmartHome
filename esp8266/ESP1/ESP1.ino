#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <sstream>
#include <string>
#include <iomanip>
#include <algorithm>
#include <cctype>

/* define constants of various pins for easy accessibility */
#define RELAY1 D1
#define RELAY2 D2
#define RELAY3 D6
#define RELAY4 D7

class Socket {
  private:
    byte pin;
    bool enabled;
    char* start;
    char* stop;
  public:
    Socket(byte pin) {
      this->pin = pin;
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
    char* getStart() {
      return start;
    }
    char* getStop() {
      return stop;
    }
    bool getEnabled() {
      return enabled;
    }
};

Socket socket1(RELAY1);
Socket socket2(RELAY2);
Socket socket3(RELAY3);
Socket socket4(RELAY4);

/* Enter ssid & password of your WiFi inside double quotes */
const char *ssid = ""; //ENTER WIFI SSID
const char *password = ""; //ENTER WIFI PASSWORD

String serverName = "http://pwojtaszko.ddns.net/espapi/"; //PUT YOUR API DOMAIN
String apiKeyValue = "";  //ENTER API KEY

unsigned long previousMillis = 0;
const long dbFetchInterval = 10000;

bool to_bool(std::string str) {
    std::transform(str.begin(), str.end(), str.begin(), ::tolower);
    std::istringstream is(str);
    bool b;
    is >> std::boolalpha >> b;
    return b;
}

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
      for(int i = 0; i < doc.size(); i++) {
        JsonObject obj = doc[i];
        const char* socketKey = obj["key"];
        const char* socketStart = obj["start"];
        const char* socketStop = obj["stop"];
        const char* socketEnabled = obj["enabled"];

        const char *s1 = "socket1";
        const char *s2 = "socket2";
        const char *s3 = "socket3";
        const char *s4 = "socket4";
        if (strcmp (socketKey, s1) == 0) {
          socket1.setTimes(to_bool(socketEnabled), (char*)socketStart, (char*)socketStop);
        } else
        if (strcmp (socketKey, s2) == 0) {
          socket2.setTimes(to_bool(socketEnabled), (char*)socketStart, (char*)socketStop);
        } else
        if (strcmp (socketKey, s3) == 0) {
          socket3.setTimes(to_bool(socketEnabled), (char*)socketStart, (char*)socketStop);
        } else
        if (strcmp (socketKey, s4) == 0) {
          socket4.setTimes(to_bool(socketEnabled), (char*)socketStart, (char*)socketStop);
        }
      }
    } else {
      Serial.print("Error code: ");
      Serial.println(httpCode);
    }
    http.end();   //Close connection
  }
}

/* This function helps initialize program and set initial values */
void setup(void) 
{
  Serial.begin(9600);
  delay(10);
  WiFi.begin(ssid, password); /* connect to WiFi */

  /* Display progress dots on serial monitor till WiFi is connected */
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  /* Display WiFi SSID and IP address on serial monitor */
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  }

void loop(void) 
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= dbFetchInterval) {
      previousMillis = currentMillis;
      fetchSockets();
    }
}
