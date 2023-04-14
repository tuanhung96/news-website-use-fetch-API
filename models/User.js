"use strict";

class UserCl {
  constructor(firstName, lastName, userName, password, category, pageSize) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.category = category;
    this.pageSize = pageSize;
  }

  async news(country, category, pageSize, page) {
    try {
      const resNews = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=0fd9035771614a71a7e4f15973815058`
      );
      if (!resNews.ok) throw new Error("Problem getting News");
      const dataNews = await resNews.json();
      return dataNews;
    } catch (err) {
      alert(err);
      throw err;
    }
  }
}
