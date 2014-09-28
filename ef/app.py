# Copyright (C) Ivan Kravets <me@ikravets.com>
# See LICENSE for details.

from subprocess import check_output
from urllib import unquote


def application(env, start_response):
    status = "200 OK"
    response = ""

    qs = env.get("QUERY_STRING", None)
    if not qs or not qs.startswith("_escaped_fragment_="):
        status = "500 Internal Server Error"
    else:
        url = "http://platformio.ikravets.com/#!" + unquote(qs[19:])
        response = check_output(["/usr/local/bin/phantomjs",
                                 "--load-images=false", "driver.js", url])

    start_response(status, [("Content-Type", "text/html"),
                            ("Content-Length", str(len(response)))])
    return response
