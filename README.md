# FormulaOneAPI

- Libraries and Framework<br>
  Both are external resourcer to help me build my application<br>
  Funcionalities: Library Provide and Framework beside provide, it guide you<br>
  Code: We use library as an addition to our code | Framework provide a code and we will adapt to its code (<b>Inversion of control</b>)
  On this project I will use <i><b><a href="https://expressjs.com/">ExpressJS</a></b></i><br>

- Cache<br>
  It is a memory like the RAM but much more quick, with much less amount available compared with RAM. Processing will use data from RAM, but if it would need more times, it will store on CACHE after the first consult with RAM<br>

- REST Protocol<br>
  Stand for "Representation State Transfer". It is a collection of rules to make our web communication has "Organization", "Flexibility", "Efficiency", Stability"<br>
  <b>Stateless</b>: All requisition should have all information needed for your request<br>
  <b>Layer and Uniform</b>: Develop our information in an hierarchy way || Padronize our HTTP Method (POST, GET, PUT, DELETE) - something like "CRUD - Create, Read, Update, Delete" || Padronize our response based on this <i><b><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">LIST</a></b></i><br>

- Our Standarization<br>
I will divide my API in two main paths as intuitive as possible
<ul>
<li>Driver: Returning the list of drivers</li>
<li>Constructors: Returning the list of Constructors</li>
</ul><br>

- Starting our project<br>
  I will use "data.js" as a database in order to focus on how to build an API<br>

- Order's algorithms<br>
  Bubble sort: It will compare two by two the elements on the array, answering the question "Is the LEFT term greater than the RIGHT one?" - If yes, it will change the position, if not it will remain as the same. With that the greatest element will be on the last position. Example:<br>
  <ul>
  <li>[1,5,8,4,6] -> [1,5] -> 1<5 -> remain the same</li>
  <li>[1,5,8,4,6] -> [5,8] -> 5<8 -> remain the same</li>
  <li>[1,5,8,4,6] -> [8,4] -> 8>4 -> Change position -> [1,5,4,8,6]</li>
  <li>[1,5,4,8,6] -> [8,6] -> 8>6 -> Change position -> [1,5,4,6,<b style="background-color:green">8</b>]</li>
  </ul>
  Problem: This algorithm has order n^2 - O(n^2) - because of tho loops, one inside another. It is easy to imagine if my array increase a lot, the performance will decrease exponentially

- Middleware<br>
  My request / response will go through this middleware before delivery result<br>
  I will use "express.json()"

- Refractory<br>
Adjustment made on my code to make it more clear and readable<br>
<ul>Adjustment Made
<li><b>inputValidation.js</b>: Separate my validation on a specific file and bring it only when needed</li>
</ul>
