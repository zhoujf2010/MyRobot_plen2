
#include <EEPROM.h>
#include "common.h"
#include "Arduino.h"


void blinkLED(int pin, int duration, int n) {
  for (int i = 0; i < n; i++)  {
    digitalWrite(pin, LOW);
    delay(duration);
    digitalWrite(pin, HIGH);
    delay(duration);
  }
}


void clearroom() {
  for (int i = 0; i < 225; ++i) {
    EEPROM.write(i, 0);
  }
  EEPROM.write(225, 0);
  EEPROM.commit();
}

void StartError(){
  clearroom();  //清空保存的wifi用户名和密码
  ESP.restart();
}

void StartFinish(){
  
  EEPROM.write(225, 0);
  EEPROM.commit();
}


int StartInit(){
  EEPROM.begin(512);
  int ch = EEPROM.read(225); //resetTimes
  EEPROM.write(225, EEPROM.read(225) + 1);
  EEPROM.commit();
  return ch;
}


void writeCusVal(int pos,int val){
  EEPROM.write(226 + pos, val);
  EEPROM.commit();
}


void writeCusVal2(int pos,int val){
  EEPROM.write(226 + pos*2, val / 256);
  EEPROM.write(226 + pos*2+1, val % 256);
  EEPROM.commit();
}


int readCusVal(int pos){
  int ch = EEPROM.read(226 + pos);
  return ch;
}


int readCusVal2(int pos){
  int ch1 = EEPROM.read(226 + pos*2);
  int ch2 = EEPROM.read(226 + pos*2+1);
  int ch = ch1 * 256 + ch2;
  
  return ch;
}
