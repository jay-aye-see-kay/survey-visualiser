# Culture Amp’s Front End Coding Test

This is my solution to the coding challenge supplied by Culture Amp on the 22nd of Jan 2020. The problem is described in `problemDescription.md`.

Architectural decisions have been captured in the `/adr` directory.


## Dev set up

TODO


## Deployment

TODO


## Assumptions

* There are only two url patterns `/surveys` and `/surveys/:surveyId`. While the second url pattern references `/survey_results/surveyId` this url responds with a 503 bad gateway, and all the data referenced in the problem description is supplied by the two working urls: "The details you can get for each survey include all of the response data".

* The problemDescription states that questions are answered on a scale from 1 to 5, but there is some data that comes through as a `"0"`, assumming this has the same meaning as a result of `""`.
