server{
    listen 8080 default_server;
    location = /stub_status {
        stub_status;
    }
  }
  