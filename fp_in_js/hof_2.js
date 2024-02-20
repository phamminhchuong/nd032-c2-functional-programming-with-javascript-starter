weaponsWithNoises = [
  {name: 'Phaser', noise: 'bssszzsssss', universe: 'Star Trek'},
	{name: 'Blaster', noise: 'Pew Pew', universe: 'Star Wars'},
	{name: 'Sonic Screwdriver', noise: 'Pew Pew', universe: 'Dr. Who'},
	{name: 'Lightsaber', noise: 'Pew Pew', universe: 'Star Wars'},
	{name: 'Noisy Cricket', noise: 'Pew Pew', universe: 'Men in Black'}
]

function weaponsFromUniverse(universe) {
	let uniWeapon = weaponsWithNoises.filter(x => x.universe === universe);
	return function (nameWeapon){
		let weapon = uniWeapon.filter(x => x.name === nameWeapon);
		if(weapon[0]){
			console.log(`used ${nameWeapon}: ${weapon[0].noise}`)
		}else{
			console.log('Noisy Cricket is not a part of the Star Wars universe');
		}
	}
}

// USAGE
const useStarWarsWeapon = weaponsFromUniverse('Star Wars')

useStarWarsWeapon('Blaster') // console logs 'used Blaster: Pew Pew'
useStarWarsWeapon('Noisy Cricket') // console logs 'Noisy Cricket is not a part of the Star Wars universe'