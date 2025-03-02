import socket
from sunfounder_controller import SunFounderController
from picarx import Picarx
from robot_hat import utils, Music
from vilib import Vilib
import os
from time import sleep

# init SunFounder Controller class
sc = SunFounderController()
sc.set_name('Picarx-001')
sc.set_type('Picarx')
sc.start()

HOST = "10.0.0.207" # IP address of Randi's Raspberry PI, please don't delete from repo, just comment out and add your own
PORT = 65432          # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((HOST, PORT))
    s.listen()
    pan_angle = 0
    tilt_angle = 0
    sc.set('video','http://'+HOST+':9000/mjpg')

    Vilib.camera_start(vflip=False,hflip=False)
    Vilib.display(local=False, web=True)
    px = Picarx()

    try:
        while 1:
            client, clientInfo = s.accept()
            print("server recv from: ", clientInfo)
            data = client.recv(1024)      # receive 1024 Bytes of message in binary format
            if data != b"":    
                #client.sendall(data) # Echo back to client
                key = data.lower()
                key = key.rstrip()
                key = key.decode('UTF-8')
                px.set_cam_pan_angle(-30)
                if key in('wsadikjl'): 
                    if 'w' == key:
                        px.set_dir_servo_angle(0)
                        px.forward(5)
                    elif 's' == key:
                        px.set_dir_servo_angle(0)
                        px.backward(5)
                    elif 'a' == key:
                        px.set_dir_servo_angle(-30)
                        px.forward(5)
                    elif 'd' == key:
                        px.set_dir_servo_angle(30)
                        px.forward(5)
                    elif 'i' == key:
                        tilt_angle+=5
                        if tilt_angle>30:
                            tilt_angle=30
                        px.set_cam_tilt_angle(tilt_angle)
                    elif 'k' == key:
                        tilt_angle-=5
                        if tilt_angle<-30:
                            tilt_angle=-30
                        px.set_cam_tilt_angle(tilt_angle)
                    elif 'l' == key:
                        pan_angle+=5
                        if pan_angle>30:
                            pan_angle=30
                        px.set_cam_pan_angle(pan_angle) 
                    elif 'j' == key:
                        pan_angle-=5
                        if pan_angle<-30:
                            pan_angle=-30 
                        px.set_cam_pan_angle(pan_angle) 
                    sleep(0.5)
                    px.forward(0)
                    px.stop()
                    sleep(0.2)
    except: 
        print("Closing socket")
        client.close()
        s.close()    



manual = '''
Press keys on keyboard to control PiCar-X!
    w: Forward
    a: Turn left
    s: Backward
    d: Turn right
    i: Head up
    k: Head down
    j: Turn head left
    l: Turn head right
    ctrl+c: Press twice to exit the program
'''


