const express = require("express") // Express 모듈 불러오기
const app = express() // Express 앱 객체 생성
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => { // Get 요청 처리
    res.send('Hello World') // 클라이언트에 응답
})

app.get('/dog', (req, res) => {
    res.send('<h1>강아지</h1>')     // html 형태로 응답
})

app.get('/cat', (req, res) => {
    res.json({'sound' : '야옹'})    // json 데이터 응답
})

app.get('/user/:id', (req, res) => {// get 방식이기 때문에 주소창에서 입력하는 값 -> id를 req 객체에 담아서 서버에 요청
    const p = req.params            // p 변수에 req 객체의 params, id 값을 담음
    console.log(p)                  // p 객체 콘솔 출력

    const q = req.query             // query 로 데이터 받기
    console.log(q.q)
    console.log(q.id)
    console.log(q.name)
    console.log(q.age)

    res.json({"userid" : q.name})     // 클라이언트에 json 형태로 q의 id 값 응답
})

app.get('/sound/:name', (req, res) => {
    const { name } = req.params

    console.log(name)

    if(name == "dog"){
        res.json({'sound' : '멍멍'})
    } else if(name == "cat"){
        res.json({'sound' : '야옹'})
    } else if(name == "pig"){
        res.json({'sound' : '꿀꿀'})
    } else{
        res.send("알 수 없음")
    }
})

app.listen(3000, () => {
    console.log("Example App Running on Port : 3000")
})            // 3000번 포트에서 서버 실행