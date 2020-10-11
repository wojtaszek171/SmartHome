import subprocess

def startStream():
    ps = subprocess.Popen(["sudo", "raspivid", "--nopreview", "-o", "-", "-t", "0", "-w", "960", "-h", "720", "-fps", "25", "-b", "4000000", "-g", "50"], stdout=subprocess.PIPE)
    output = subprocess.Popen(["ffmpeg", "-re", "-f", "h264", "-i", "-", "-vcodec", "copy", "-g", "50", "-strict", "experimental", "-f", "flv", "-metadata", "streamName=myStream", "rtmp://pwojtaszko.ddns.net/show/stream"], stdin=ps.stdout)
    