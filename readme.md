[BUILD BADGE HERE]


## Set up

- Clone the repository
- Ensure node and npm are installed on your machine
  - Supported versions: Node v6.9.5, npm: v3.10.10 - node v12.11.1, npm v6.11.3
- Run `node ./locker.js`

## Discussion Points

- https://jsperf.com/locker-speed
- The above link tests 3 iterations in my journey to completing this challene
- 0.1 fleshes out the basic logic using the rules provided
- 0.2 starts to improve on nesting and function depth
- 0.3 makes the logic highly readable and testable, yet jsperf notes that it's the slowest
- Although performance in general is *extremely* important, I've long thought that code execution time is boosted up the rankings of importance far ahead of where it should be
- Yes code should run at a reasonable pace, but I do believe that readability, maintainability and testability begin to outweigh the importance of 'speed over everything'
- For me, the speed that an engineer can work in a code pace is just as important as the code speed. Especially in smaller companies that need to pivot and react quickly.