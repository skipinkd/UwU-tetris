    // License CC0 1.0 Universal 
    // https://gist.github.com/straker/3c98304f8a6a9174efd8292800891ea1
    // https://tetris.fandom.com/wiki/Tetris_Guideline

    // получаем доступ к холсту
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const canvasNext = document.getElementById('next');
    const contextNext = canvasNext.getContext('2d');
    // размер квадратика
    const grid = 32;
    let newi = 0;
    let newelm = 0;
    let countRow = 30;
    let level = 'easy';
    let award = localStorage.getItem('newi');
    // массив с последовательностями фигур, на старте — пустой
    var tetrominoSequence = [];

    // с помощью двумерного массива следим за тем, что находится в каждой клетке игрового поля
    // размер поля — 10 на 20, и несколько строк ещё находится за видимой областью
    var playfield = [];
    var nextField = [];
    let masElmt = [];

    // заполняем сразу массив пустыми ячейками
    for (let row = -2; row < 20; row++) {
      playfield[row] = [];

      for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
      }
    }

    
        // заполняем сразу массив пустыми ячейками
    for (let row = 0; row < 10; row++) {
      nextField[row] = [];

      for (let col = 0; col < 10; col++) {
        nextField[row][col] = 0;
      }
    }
    
    

        function elm_all(array){
          if(array == 'I'){
            elm_I();
          }

          if(array == 'J'){
            elm_J();
          }

          if(array == 'L'){
            elm_L();
          }

          if(array == 'O'){
            elm_O();
          }

          if(array == 'S'){
            elm_S();
          }

          if(array == 'Z'){
            elm_Z();
          }

          if(array == 'T'){
            elm_T();
          }
        };
        
        function shetRow(row){
          let count;
          if(row < 2){
            count = 1;
            console.log('ok---');
          }
        }

        function elm_O(){
          contextNext.fillStyle = colors.O;
          contextNext.clearRect(0, 0, canvas.width, canvas.height);
          contextNext.fillRect(127, 127, 32, 32);
          contextNext.fillRect(127, 161, 32, 32);
          contextNext.fillRect(161, 127, 32, 32);
          contextNext.fillRect(161, 161, 32, 32);
          };
  
          function elm_I(){
            contextNext.fillStyle = colors.I;
            contextNext.clearRect(0, 0, canvas.width, canvas.height);
            contextNext.fillRect(93, 144, 32, 32);
            contextNext.fillRect(127, 144, 32, 32);
            contextNext.fillRect(161, 144, 32, 32);
            contextNext.fillRect(195, 144, 32, 32);
          };
  
          function elm_T(){
            contextNext.fillStyle = colors.T;
            contextNext.clearRect(0, 0, canvas.width, canvas.height);
            contextNext.fillRect(144, 127, 32, 32);
            contextNext.fillRect(110, 161, 32, 32);
            contextNext.fillRect(144, 161, 32, 32);
            contextNext.fillRect(178, 161, 32, 32);
          };
          
          function elm_Z(){
            contextNext.fillStyle = colors.Z;
            contextNext.clearRect(0, 0, canvas.width, canvas.height);
            contextNext.fillRect(110, 127, 32, 32);
            contextNext.fillRect(144, 127, 32, 32);
            contextNext.fillRect(144, 161, 32, 32);
            contextNext.fillRect(178, 161, 32, 32);
          };
  
          function elm_S(){
            contextNext.fillStyle = colors.S;
            contextNext.clearRect(0, 0, canvas.width, canvas.height);
            contextNext.fillRect(110, 161, 32, 32);
            contextNext.fillRect(144, 127, 32, 32);
            contextNext.fillRect(144, 161, 32, 32);
            contextNext.fillRect(178, 127, 32, 32);
          };
  
          function elm_L(){
            contextNext.fillStyle = colors.L;
            contextNext.clearRect(0, 0, canvas.width, canvas.height);
            contextNext.fillRect(178, 127, 32, 32);
            contextNext.fillRect(110, 161, 32, 32);
            contextNext.fillRect(144, 161, 32, 32);
            contextNext.fillRect(178, 161, 32, 32);
          };
  
          function elm_J(){
            contextNext.fillStyle = colors.J;
            contextNext.clearRect(0, 0, canvas.width, canvas.height);
            contextNext.fillRect(110, 127, 32, 32);
            contextNext.fillRect(110, 161, 32, 32);
            contextNext.fillRect(144, 161, 32, 32);
            contextNext.fillRect(178, 161, 32, 32);
          };
    
    const tetrominos = {
      'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
      ],
      'L': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
      ],
      'O': [
        [1,1],
        [1,1],
      ],
      'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
      ],
      'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
      ],
      'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
      ]
    };

    // цвет каждой фигуры
    const colors = {
      'I': 'cyan',
      'O': 'yellow',
      'T': 'purple',
      'S': 'green',
      'Z': 'red',
      'J': 'blue',
      'L': 'orange'
    };

    // счётчик
    let count = 0;
    // текущая фигура в игре
    let tetromino = getNextTetromino();
    let NextTetromino;
    // следим за кадрами анимации, чтобы если что — остановить игру
    let rAF = null;  
    // флаг конца игры, на старте — неактивный
    let gameOver = false;


    // Функция возвращает случайное число в заданном диапазоне
    // https://stackoverflow.com/a/1527820/2124254
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // создаём последовательность фигур, которая появится в игре
    //https://tetris.fandom.com/wiki/Random_Generator
    function generateSequence() {
      // тут — сами фигуры
      const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

      while (sequence.length) {
        // случайным образом находим любую из них
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        // помещаем выбранную фигуру в игровой массив с последовательностями
        tetrominoSequence.push(name);
        masElmt.push(name);
      }


    }

    //console.log(masElmt);

    // получаем следующую фигуру
    function getNextTetromino() {
      let secondName;
      // если следующей нет — генерируем
      if (tetrominoSequence.length === 0) {
        generateSequence();
        //console.log('----ok----');
      }
      // берём первую фигуру из массива
      const name = tetrominoSequence.pop();
      //console.log(tetrominoSequence.length);
      
      //console.log(newelm);
      newelm = newelm + 1;
      for (const value of masElmt) {
      //console.log(value);
      }
      document.getElementById("elmcnt").innerHTML="фигура: "+ newelm;
      // сразу создаём матрицу, с которой мы отрисуем фигуру
      const matrix = tetrominos[name];

      // I и O стартуют с середины, остальные — чуть левее
      const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

      // I начинает с 21 строки (смещение -1), а все остальные — со строки 22 (смещение -2)
      const row = name === 'I' ? -1 : -2;

      secondName = tetrominoSequence[tetrominoSequence.length - 1];
      //console.log("потом " + secondName);
      elm_all(secondName);
      // вот что возвращает функция 
      return {
        name: name,      // название фигуры (L, O, и т.д.)
        matrix: matrix,  // матрица с фигурой
        row: row,        // текущая строка (фигуры стартую за видимой областью холста)
        col: col,        // текущий столбец
      };

    }

    // поворачиваем матрицу на 90 градусов
    // https://codereview.stackexchange.com/a/186834
    function rotate(matrix) {
      const N = matrix.length - 1;
      const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
      );
      // на входе матрица, и на выходе тоже отдаём матрицу
      return result;
    }

    // проверяем после появления или вращения, может ли матрица (фигура) быть в этом месте поля или она вылезет за его границы
    function isValidMove(matrix, cellRow, cellCol) {
      // проверяем все строки и столбцы
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          if (matrix[row][col] && (
              // если выходит за границы поля…
              cellCol + col < 0 ||
              cellCol + col >= playfield[0].length ||
              cellRow + row >= playfield.length ||
              // …или пересекается с другими фигурами
              playfield[cellRow + row][cellCol + col])
            ) {
            // то возвращаем, что нет, так не пойдёт
            return false;
          }
        }
      }
      // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
      return true;
    }

    // когда фигура окончательна встала на своё место
    function placeTetromino() {
      


      // обрабатываем все строки и столбцы в игровом поле
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {

            // если край фигуры после установки вылезает за границы поля, то игра закончилась
            if (tetromino.row + row < 0) {
              return showGameOver();
            }
            // если всё в порядке, то записываем в массив игрового поля нашу фигуру
            //nextField[tetromino.row + row][tetromino.col + col] = tetromino.name;
            //console.log(playfield);
            playfield[tetromino.row + row][tetromino.col + col] = tetromino.name; //!!!!!!
            //console.log('q');
            //console.log(tetromino); 
            //console.log(nextField);       
          }
        } 
      }

      // проверяем, guyчтобы заполненные ряды очистились снизу вверх
      for (let row = playfield.length - 1; row >= 0; ) {
        // если ряд заполнен
        if (playfield[row].every(cell => !!cell)) {

          // очищаем его и опускаем всё вниз на одну клетку
          newi = newi + 1;
          document.getElementById("count").innerHTML="ряд: " + newi;
          for (let r = row; r >= 0; r--) {
            for (let c = 0; c < playfield[r].length; c++) {
              playfield[r][c] = playfield[r-1][c];
            }
          }
        }
        else {
          // переходим к следующему ряду
          row--;
        }
      }
      
      // получаем следующую фигуру
      tetromino = getNextTetromino();
      
    }

      // показываем надпись Game Over
      function showGameOver() {
        // прекращаем всю анимацию игры
        cancelAnimationFrame(rAF);
        // ставим флаг окончания
        gameOver = true;
        // рисуем чёрный прямоугольник посередине поля
        context.fillStyle = 'black';
        context.globalAlpha = 0.75;
        context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
        // пишем надпись белым моноширинным шрифтом по центру
        context.globalAlpha = 1;
        context.fillStyle = 'white';
        context.font = '36px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
        if(newi > award){
          award = localStorage.setItem('newi', newi);
          console.log(award);
          document.getElementById("award").innerHTML="рекорд: " + newi;
        }else{
          document.getElementById("award").innerHTML="рекорд: " + award;
        }
      }

    

    // главный цикл игры
    function loop() {
      // начинаем анимацию
      rAF = requestAnimationFrame(loop);
      // очищаем холст
      context.clearRect(0,0,canvas.width,canvas.height);
      document.getElementById("award").innerHTML="рекорд: " + award;
      
      // рисуем игровое поле с учётом заполненных фигур
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (playfield[row][col]) {
            const name = playfield[row][col];
            context.fillStyle = colors[name];

            // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
            context.fillRect(col * grid, row * grid, grid-1, grid-1);
            // заполняем сразу массив пустыми ячейками
            for (let row = 0; row < 10; row++) {
              nextField[row] = [];
              for (let col = 0; col < 10; col++) {
              nextField[row][col] = 0;
              }
            }
          }
        }
      }

      

      // рисуем текущую фигуру
      if (tetromino) {
        // фигура сдвигается вниз каждые 35 кадров
        if(newi >= 5 && newi <= 10){
          countRow = 10;
          level = 'medium';
          document.getElementById("level").innerHTML="lvl: " + level;
          console.log(level);
        }else if(newi >= 20){
          countRow = 4;
          level = 'hard';
          console.log(level);
          document.getElementById("level").innerHTML="lvl: " + level;
        }

        if (++count > countRow) {
          tetromino.row++;
          count = 0;
          // если движение закончилось — рисуем фигуру в поле и проверяем, можно ли удалить строки
          if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.row--;
            placeTetromino();
          }
        }

        // не забываем про цвет текущей фигуры
        context.fillStyle = colors[tetromino.name];

        // отрисовываем её
        for (let row = 0; row < tetromino.matrix.length; row++) {
          for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

              // и снова рисуем на один пиксель меньше
              context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);


            }
          }
        }
      }


    }
    //виртуальные кнопки

      function provBut(but){
        //влево и вправо
        if (but == 'left' || but == 'right') {
          const col = but === 'left'
          // если влево, то уменьшаем индекс в столбце, если вправо — увеличиваем
          ? tetromino.col - 1
          : tetromino.col + 1;

          // если так ходить можно, то запоминаем текущее положение 
          if (isValidMove(tetromino.matrix, tetromino.row, col)) {
          tetromino.col = col;
          }
        }

        //вверх — поворот
        if (but == 'up') {
          // поворачиваем фигуру на 90 градусов
          const matrix = rotate(tetromino.matrix);
          // если так ходить можно — запоминаем
          if (isValidMove(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
          }
        }

        //вниз — ускорить падение
        if(but == 'down') {
          // смещаем фигуру на строку вниз
          const row = tetromino.row + 1;
          // если опускаться больше некуда — запоминаем новое положение
          if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
            // ставим на место и смотрим на заполненные ряды
            placeTetromino();
            return;
          }
          // запоминаем строку, куда стала фигура
          tetromino.row = row;
        }
      }

    
    left.onclick = function() {
      let but = 'left';
      provBut(but);
    };
    right.onclick = function() {
      let but = 'right';
      provBut(but);
    };
    up.onclick = function() {
      let but = 'up';
      provBut(but);
    };
    down.onclick = function() {
      let but = 'down';
      provBut(but);
    };

    // следим за нажатиями на клавиши
    document.addEventListener('keydown', function(e) {
      // если игра закончилась — сразу выходим
      if (gameOver) return;
      // стрелки влево и вправо
      if ((e.which === 37) || (e.which === 39)) {
        const col = e.which === 37
          // если влево, то уменьшаем индекс в столбце, если вправо — увеличиваем
          ? tetromino.col - 1
          : tetromino.col + 1;

        // если так ходить можно, то запоминаем текущее положение 
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
          tetromino.col = col;
        }
      }

      // стрелка вверх — поворот
      if (e.which == 38) {
        // поворачиваем фигуру на 90 градусов
        const matrix = rotate(tetromino.matrix);
        // если так ходить можно — запоминаем
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
          tetromino.matrix = matrix;
        }
      }

      // стрелка вниз — ускорить падение
      if(e.which === 40) {
        // смещаем фигуру на строку вниз
        const row = tetromino.row + 1;
        // если опускаться больше некуда — запоминаем новое положение
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
          tetromino.row = row - 1;
          // ставим на место и смотрим на заполненные ряды
          placeTetromino();
          return;
        }
        // запоминаем строку, куда стала фигура
        tetromino.row = row;
      }
    });

    // старт игры
    rAF = requestAnimationFrame(loop);
