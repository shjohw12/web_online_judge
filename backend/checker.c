#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
#include<sys/types.h>
#include<sys/wait.h>
#include<sys/stat.h>
#include<unistd.h>
#include<signal.h>
#include<fcntl.h>


char in[101];
char out[101];
char time_buf[101];
char memory_buf[101];
char buf[10101];


// code, time_limit, memory_limt, problem_id, tese_case
int main(int argc, char *argv[]) {
    int time_limit = atoi(argv[2]) * sysconf(_SC_CLK_TCK);
    int memory_limit = atoi(argv[3]) * 1024;

    int problem_id = atoi(argv[4]);
    int test_case = atoi(argv[5]);

    for (int i = 1; i <= test_case; i++) {

        sprintf(in, "%d/%d.in", problem_id, i);
        sprintf(out, "%d.user", i);

        int pid;
        if ((pid = fork()) == 0) {
            int in_fd = open(in, O_RDONLY);
            int out_fd = open(out, O_CREAT | O_WRONLY | O_TRUNC, 0666);
            dup2(in_fd, STDIN_FILENO);
            dup2(out_fd, STDOUT_FILENO);
            close(in_fd);
            close(out_fd);

            // cpp
            if (argv[1][0] == '.') {
                execlp(argv[1], argv[1], NULL);
            }
            else {
                execlp("python3", "python3", argv[1], NULL);
            }
        }
        else {
            int status;
            sprintf(time_buf, "/proc/%d/stat", pid);
            sprintf(memory_buf, "/proc/%d/status", pid);

            unsigned time_used = 0;
            unsigned memory_used = 0;

            while (1) {
                FILE *f = fopen(time_buf, "r");
                if (f) {
                    unsigned t;
                    int sz = fscanf(f, "%*d %*s %*c %*d %*d %*d %*d %*d %*u %*u %*u %*u %*u %u", &t);
                    fclose(f);
                    if (sz == 1) {
                        time_used = t;
                    }
                }

                if (time_used > time_limit) {
                    kill(pid, SIGKILL);
                    waitpid(pid, &status, 0);
                    printf("1 %ld %d\n", time_used * 1000 / sysconf(_SC_CLK_TCK), memory_used);
                    break;
                }

                f = fopen(memory_buf, "r");

                if (f) {
                    int sz = fread(buf, 1, 10100, f);
                    buf[sz] = '\0';
                    fclose(f);
                    char *ptr = strstr(buf, "VmPeak:");
                    if (ptr) {
                        int t;
                        sz = sscanf(ptr, "%*s %d", &t);
                        if (sz == 1) {
                            memory_used = t;
                        }
                    }
                }

                if (memory_used > memory_limit) {
                    kill(pid, SIGKILL);
                    waitpid(pid, &status, 0);
                    printf("2 %ld %d\n", time_used * 1000 / sysconf(_SC_CLK_TCK), memory_used);
                    break;
                }

                int r = waitpid(pid, &status, WNOHANG);

                if (r != 0) {
                    // runtime error
                    if (WIFSIGNALED(status)) {
                        printf("3 %ld %d\n", time_used * 1000 / sysconf(_SC_CLK_TCK), memory_used);
                    }
                    else {
                        printf("0 %ld %d\n", time_used * 1000 / sysconf(_SC_CLK_TCK), memory_used);
                    }
                    break;
                }
            }
        }
    }



    return 0;
}