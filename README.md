# Test-Driving-JavaScript-Applications_charpter5

*参考书《JavaScript 测试驱动开发》*

~~0. 准备 GitHub、TravisCI、NodeJs 等环境；~~

~~1. 如果文件无效，read 函数调用错误处理器；~~

1. 如果文件有效，read 函数调用 processTickers 函数；

3. ProcessTickers 为每支股票调用 getPrice 函数；

4. getPrice 调用 Web 服务；

5. 如果 Web 服务响应成功，getPrice 更新 prices 集合；

6. 如果 Web 服务响应失败，getPrice 更新 errors 集合；

7. getPrice 在最后调用 printReport 函数；

8. printReport 对结果进行排序后输出；