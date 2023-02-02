/*
Definiți un tip obiectual (Widget)
Funcția decorate adaugă la Widget o metodă numită enhance, care crește mărimea unui widget cu "n"
Dacă parametrul trimis nu este un număr, se aruncă o excepție ("InvalidType")
Metoda funcționează și asupra Widget-urilor deja declarate
*/

/*
Define a Widget object type is defined
The decorate function adds to Widget a method called enhance which increases the size of a widget with n
If the parameter is not a number an exception is thrown ("InvalidType")
The method also works on already declared Widgets
*/

class Widget {
	
	// TODO: completați implementarea
	// TODO: finish the implementation

	constructor(name, size){
		this.name = name
		this.size = size
	}

	getDescription(){
		return `a ${this.name} of size ${this.size}`
	}
	// get name(){
	// 	return this.name
	// }
	// set name(name){
	// 	this.name = name
	// }

	// get size(){
	// 	return this.size
	// }
	// set size(size){
	// 	this.size = size
	// }
}

function decorate(){
	//TODO: implementați funcția
	// TODO: implement the function
	Widget.prototype.enhance = function(n){
		if(typeof n !=='number'){
			throw new Error("InvalidType")
		} else{
			this.size += n
		}
	}
}


module.exports.decorate = decorate
module.exports.Widget = Widget