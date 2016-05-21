let foo = 'bar';

let sidebar = document.getElementById('sidebar');
let tiles = document.getElementsByClassName('tile');

function expandTile() {
  console.log('expand tile');
  sidebar.classList.add('is-collapsed');
}

[].forEach.call(tiles, (tile) => {
  tile.addEventListener('click', expandTile);
});
