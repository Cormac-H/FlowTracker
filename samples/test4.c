#include <stdbool.h>

extern void broadcast();
char* getchar(){    return "/0 ";   };
extern void MAYALIAS(void* p, void* q);
int main(){
    bool loopCondition = true;
    bool BranchCondition = true;   
    char* secretToken = getchar();
    while(loopCondition){
        if(BranchCondition){
            char* a = secretToken;             
            broadcast(a);
            MAYALIAS(a,secretToken);                    
        }
        else{
            char* b = "hello";                         
        }
    }
}
//====TAINTED FLOW====
//9  25
//9  25
//10  5
//10  11
//10  5
//11  12
//11  12
//13  13

//====TAINTED FLOW====
//9 25
//4 1
//4 21
//4 1
//9 25
//10 5
//10 11
//10 5
//11 12
//11 12
//13 13
