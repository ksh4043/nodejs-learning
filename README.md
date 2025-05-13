# Node.js-Learnigng

## Node.js 설치 경로
https://nodejs.org/ko/

## npm(Node Package Manager)
이미 만들어진 모듈의 저장소
터미널에서 인스톨 후 사용할 수 있음
npm install ["module-name"]

## npm init
package.json -> 설치된 모듈들을 정리해주는 메모장 같은 역할

npm init 사용 시 에러
```
npm : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Program Files\nodejs\npm.ps1 파일을 로드할 수 없습니다. 자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)를 참조하십시오.
```

해결 방법
Window PowerShell 관리자 권한으로 실행 후
Set-ExecutionPolicy RemoteSigned 입력
변경 여부 y 입력

설치 옵션
-g : 현재 프로젝트 뿐만 아니라 로컬 PC 전체에서 해당 모듈을 사용할 수 있음 -> 전역 설치 시에 충돌 위험이 있으므로 프로젝트별로 설치 권장

삭제 명령
npm uninstall ["module-name"]

## express
웹 프레임워크 : 프론트엔드에서 백엔드로 요청이 있을 시, 응답해주는 역할

```
const express = require("express") // Express 모듈 불러오기
const app = express() // Express 앱 객체 생성

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

    const q = req.query
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

app.listen(3000)            // 3000번 포트에서 서버 실행
```

```
const express = require("express")
```
require("module-name") : Node.js에서 외부 모듈 또는 파일을 불러오는 함수
express 모듈을 가져옴

```
const app = express()
```
app 변수에 express 인스턴스 초기화

```
app.get('/', (req, res) => {
  res.send('Hello World')
})
```
app.get() -> HTTP 메소드 :
GET 방식과 POST 방식이 있음
GET : 주소창으로 데이터 전달
POST : body로 데이터 전달
'/' -> Routing :
웹 경로. '/' 루트 경로로 기본 경로임.
() => {} : 콜백함수

```
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
```

사용자의 id를 파라미터로 받을 때에는 :id

query 요청 예시
```
http://localhost:3000/user/asdf?q=sikgong&name=ssk&age=27
```
![alt text](image.png)


응답이 정상적으로 이루어지면 res 객체의 send() 메소드 호출해서 클라이언트에 응답 -> localhost:3000 으로 Hello World 전달

| 속성            | 설명                       | 예시                                                                                |
| ------------- | ------------------------ | --------------------------------------------------------------------------------- |
| `req.method`  | 요청 방식                    | `"GET"`, `"POST"`, `"PUT"`, `"DELETE"` 등                                          |
| `req.url`     | 요청된 URL 경로               | `"/"`, `"/login"`, `"/users/123"` 등                                               |
| `req.headers` | 요청 헤더 정보                 | `req.headers['content-type']` 등                                                   |
| `req.query`   | 쿼리스트링 파라미터               | `/search?keyword=abc` → `{ keyword: "abc" }`                                      |
| `req.params`  | URL 파라미터 (동적 라우팅)        | `/user/:id` → `/user/123` → `{ id: "123" }`                                       |
| `req.body`    | 요청 바디 (POST/PUT 요청 시 사용) | `{ username: "abc", password: "1234" }`<br>※ `express.json()` 또는 `body-parser` 필요 |

| 메서드              | 설명                     | 예시                                            |
| ---------------- | ---------------------- | --------------------------------------------- |
| `res.send()`     | 문자열, HTML, 객체 등 응답 보내기 | `res.send("Hello")`, `res.send({ ok: true })` |
| `res.json()`     | JSON 형식으로 응답 보내기       | `res.json({ name: "Kim" })`                   |
| `res.status()`   | HTTP 상태 코드 설정          | `res.status(404).send("Not Found")`           |
| `res.redirect()` | 다른 URL로 리다이렉션          | `res.redirect("/login")`                      |
| `res.set()`      | 응답 헤더 수동 설정            | `res.set("Content-Type", "text/plain")`       |

```
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
```

{ 변수1, 변수2, 변수3 ... }
객체 구조 분해 할당 : 객체에서 값을 뽑아서 변수로 바로 할당하는 문법
할당하려는 수와 맞춰서 변수를 선언
현재 req의 params에는 name 하나만 존재(요청 시 받는 필드명이 :name 하나기 때문)하여 name 변수만 선언 및 할당
라우팅 시에 여러 파라미터가 넘어오는 경우, 순서에 맞춰서 할당하면 됨

