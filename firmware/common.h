
void blinkLED(int pin, int duration, int n);

int StartInit();

void StartError();

void StartFinish();
void clearroom();


void writeCusVal(int pos,int val); //序号从1开始
void writeCusVal2(int pos,int val); //序号从1开始 ,双位

int readCusVal(int pos);
int readCusVal2(int pos); //双位
