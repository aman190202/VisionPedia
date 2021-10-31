function setpage(s) {
    if (s === "choose") {
      page = pagechoose;
      things[0].seekto(width / 2, height / 5);
      things[1].seekto(width / 2, -height);
    }
    if (s === "student") {
      page = pagestudent;
      things[0].seekto(width / 2, -height / 8);
      things[0].sf = 0.05;
      things[1].seekto(width / 2, height * 0.05);
      things[1].s = "Student";
    }
    if (s === "teacher") {
      page = pageteacher;
      things[0].seekto(width / 2, -height / 8);
      things[0].sf = 0.05;
      things[1].seekto(width / 2, height * 0.05);
      things[1].s = "Teacher";
    }
  }