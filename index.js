const express = require("express") // Express 모듈 불러오기
const app = express() // Express 앱 객체 생성

app.get('/', (req, res) => { // Get 요청 처리
  res.send('Hello World') // 클라이언트에 응답
})

app.listen(3000)            // 3000번 포트에서 서버 실행