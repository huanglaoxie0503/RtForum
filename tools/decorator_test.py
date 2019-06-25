# -*- coding: utf-8 -*-
import time
import functools
"""
装饰器(decorator)的原理
"""


def time_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        func(*args, **kwargs)
        end_time = time.time()
        print("last time:{0}".format(end_time - start_time))
    return wrapper


@time_decorator
def add(a, b):
    # start_time = time.time()
    time.sleep(3)
    # end_time = time.time()
    # print("last time:{0}".format(end_time - start_time))
    return a + b


if __name__ == '__main__':
    print(add(1, 2))
