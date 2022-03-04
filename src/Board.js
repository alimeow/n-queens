// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // loop through passed in row, if there are more than one pieces, return true
      // if not after looping through all indexes, return false

      // filter out all 1's into new array and then check length
      // if length is greater than 1 , returns true, there is conflict
      // else returns false
      return this.rows()[rowIndex].filter(item => item === 1).length > 1 ? true : false;

      // return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // loop through boards rows
      // pass each row into hasRowConflicts
      // check result of that call
        // if true , return true
        // if all false, automatically return false
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // this should be the same as our hasRowConflict solution, just checking columns instead of rows
      // var columns = [];
      // for (let i = 0; i < this.rows().length; i++) {
      //   columns.push(this.rows().map(row => row[i]));
      // }

      let col = this.rows().map(row => row[colIndex]);

      return col.filter( item => item === 1 ).length > 1 ? true : false;

      //return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // declare columnsArray to be an empty array
      // find a way to grab each column as it's own array and push it into the columnsArray

      // loop through the board rows (this.rows())
      // call .map on the board rows , with the callback function only relacing each value with the value of row[i]

      for (let j = 0; j < this.rows().length; j++) {
        if (this.hasColConflictAt(j)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // diagonal array that will hold the specififed diagonal at index given

      // I: Column Index at First Row
      // O: true or false based on if there is a conflict in that diagonal
      // C:
      // E:

      // given the column index at the first row
      // we want to traverse down each row and grab the index + 1 of that row
      // check if that row, col index is within bounds
      // if yes, we push it to the diagonal array holder
      // if not, we end our traversal of that diagonal ..?
      let index = majorDiagonalColumnIndexAtFirstRow;


      let diagonals = []; // array to hold diagonal that we are checking
      let rotatedDiagonals = []; // array to hold the diagonal of the rotated matrix
      let rotated180 = []; // array to hold the rotated matrix

      // this function rotates the matrix (basically just grabs the columns so we can check using the same algorithm)
      for (let i = 0; i < this.rows().length; i++) {
        rotated180.push(this.rows().map(row => row[i]));
      }

      // push the diagonals from each matrix, the regular and the rotated, into each diagonal arary
      for (let i = 0; i < this.rows().length; i++) {
        diagonals.push(this.rows()[i][index + i]);
        rotatedDiagonals.push(rotated180[i][index + i]);
      }

      // we run our check, if either of the diagonals have a conflict, then we return true, else we return false
      return ((diagonals.filter(item => item === 1).length > 1) ||
             (rotatedDiagonals.filter(item => item === 1 ).length > 1)) ? true : false;

      // ------------------------------------------------------
      // let index = majorDiagonalColumnIndexAtFirstRow;
      // let counterAhead = index - 1;
      // let counterBehind = index;

      // // let diagonalArray = this.rows().map((row) => {
      // //   counterAhead++;
      // //   return (row[counterAhead]);
      // // });

      // // let diagonalArray = this.rows().map((row) => {
      // //   counterAhead++;
      // //   if (row[counterAhead] !== undefined) {
      // //     return (row[counterAhead]);
      // //   }
      // // });

      // let diagonalArray = [];
      // let behindArray = [];

      // for (let i = 0; i < this.rows().length; i++) {
      //   if (this._isInBounds(i, counterAhead + 1)) {
      //     diagonalArray.push(this.rows()[i][counterAhead]);
      //   }
      //   counterAhead++;
      // }

      // // I think we can use .join to do another map function to just count behind us as long
      // //as the row/col is within bounds !
      // for (let j = this.rows().length - 1; j > 0; j--) {
      //   counterBehind--;
      //   if (this._isInBounds(j, counterBehind - 1)) {
      //     behindArray.push(this.rows()[j][counterBehind]);
      //   }
      // }

      // console.log(diagonalArray);
      // console.log(behindArray);

      // diagonalArray.concat(behindArray);

      // console.log(diagonalArray);
      // ------------------------------------------------------
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // loop through size first row
      // call hasMajorDiagonalConflictAt for each index of the first row
      // check if above function is equal to true, if yes, return true
      // else return false

      for (let k = 0; k < this.rows().length; k++) {
        if (this.hasMajorDiagonalConflictAt(k)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let index = minorDiagonalColumnIndexAtFirstRow;
      let diagonals = []; // array to hold diagonal that we are checking
      let rotatedDiagonals = []; // array to hold the diagonal of the rotated matrix
      let rotated180 = []; // array to hold the rotated matrix

      // this function rotates the matrix (basically just grabs the columns so we can check using the same algorithm)
      for (let i = this.rows().length - 1; i >= 0; i--) {
        let container = [];
        for (let j = this.rows().length - 1; j >= 0; j--) {
          container.push(this.rows()[i][j]);
        }
        rotated180.push(container);
      }

      //console.log(this.rows());
      console.log(rotated180);

      // push the diagonals from each matrix, the regular and the rotated, into each diagonal arary
      for (let i = this.rows().length - 1; i >= 0; i--) {
        diagonals.push(this.rows()[i][index - i]);
        rotatedDiagonals.push(rotated180[i][index - i]);
      }

      //console.log(diagonals);
      //console.log(rotatedDiagonals);

      // we run our check, if either of the diagonals have a conflict, then we return true, else we return false
      return ((diagonals.filter(item => item === 1).length > 1) ||
             (rotatedDiagonals.filter(item => item === 1 ).length > 1)) ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (let k = this.rows().length - 1; k >= 0; k--) {
        if (this.hasMinorDiagonalConflictAt(k)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
