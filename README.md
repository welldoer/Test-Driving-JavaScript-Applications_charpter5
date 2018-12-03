# Test-Driving-JavaScript-Applications_charpter5

*参考书《JavaScript 测试驱动开发》*

~~0. 准备 GitHub、TravisCI、NodeJs 等环境；~~

~~1. 如果文件无效，read 函数调用错误处理器；~~

~~2. 如果文件有效，read 函数调用 parseTickers 和 processTickers 函数；~~

3. ProcessTickers 为每支股票调用 getPrice 函数；

4. getPrice 调用 Web 服务；

5. 如果 Web 服务响应成功，getPrice 更新 prices 集合；

6. 如果 Web 服务响应失败，getPrice 更新 errors 集合；

7. getPrice 在最后调用 printReport 函数；

8. printReport 对结果进行排序后输出；

~~9. read 函数处理空文件~~

~~10. read 函数处理内容格式不符合预期的文件~~

11. parseTickers 接收一个字符串，返回一个股票列表

12. 如果文件内容为空，则 parseTickers 返回一个空数组

13. 如果文件内容只包含空白字符，则 parseTickers 返回一个空数组

14. parseTickers 处理格式不符合预期的内容

