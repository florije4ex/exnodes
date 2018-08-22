# Usage

```
1.build stellar base image
cd base and read the readme.md
2.build stellar image
docker build -t florije4ex/stellar .
3.start container
docker run -it --rm --name stellar -p 8000:8000 florije4ex/stellar
```