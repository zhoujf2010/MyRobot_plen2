#include <Wire.h>

void setup() {
  Serial.begin(115200);
  Serial.println("start......");

  pinMode(LED, OUTPUT);

}

void loop() {
  digitalWrite(2, HIGH);
  Serial.println("1");
  delay(500);
  digitalWrite(2, LOW);
  Serial.println("2");
  delay(500);
}
