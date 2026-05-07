
class Student {
    constructor(id, name, age){
        this.id = id;
        this.name = name;
        this.age = age;
    }

    speakName(){
        console.log(`Hi my name is ${this.name}`);
    }

    getId(){
        console.log(`Student ${this.name} Id is ${this.id}`)
    }
}

const student1 = new Student(1, "Pedro", 30);
const student2 = new Student(2, "Jessica", 20);
student1.getId();
student2.getId();



class Car {
    constructor(model, make){
      this.carModel = model;
      this.make = make
    }

    carInfo(){
        console.log(`Car Model: ${this.carModel} \n Car Make; ${this.make}`)
    }
}

const tesla = new Car("model 3", "Tesla");
const hyundai = new Car("i30", "Hyundai");
// tesla.carInfo();
// hyundai.carInfo();