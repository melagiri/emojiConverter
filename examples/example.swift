import Foundation

// Example Swift file with emojis for testing the VS Code Emoji to Unicode Converter extension

// Animal protocol with emoji support 🦁
protocol Animal {
    var name: String { get }
    var emoji: String { get }
    func makeSound() -> String
}

// Cat implementation with emoji 🐱
class Cat: Animal {
    let name: String
    let emoji = "🐱"
    
    init(name: String) {
        self.name = name
    }
    
    func makeSound() -> String {
        return "Meow! 😸"
    }
    
    func purr() -> String {
        return "Purrrr... 😻"
    }
}

// Dog implementation with emoji 🐶
class Dog: Animal {
    let name: String
    let emoji = "🐶"
    
    init(name: String) {
        self.name = name
    }
    
    func makeSound() -> String {
        return "Woof! 🐕"
    }
    
    func fetchBall() -> String {
        return "Running to get the ball! 🏃‍♂️💨"
    }
}

// Bird implementation with emoji 🐦
class Bird: Animal {
    let name: String
    let emoji = "🐦"
    let canFly: Bool
    
    init(name: String, canFly: Bool = true) {
        self.name = name
        self.canFly = canFly
    }
    
    func makeSound() -> String {
        return "Tweet! 🎵"
    }
    
    func fly() -> String {
        if canFly {
            return "Flying high in the sky! ✈️"
        } else {
            return "Sorry, I can't fly 😢"
        }
    }
}

// AnimalShelter to manage animals 🏠
class AnimalShelter {
    var animals: [Animal] = []
    
    func addAnimal(animal: Animal) {
        animals.append(animal)
        print("Added \(animal.emoji) \(animal.name) to the shelter! 🎉")
    }
    
    func listAnimals() {
        print("\nAnimals in the shelter: 📋")
        for animal in animals {
            print("\(animal.emoji) \(animal.name) says: \(animal.makeSound())")
        }
    }
}

// Create a new animal shelter
let shelter = AnimalShelter()

// Add some animals
let fluffy = Cat(name: "Fluffy")
shelter.addAnimal(animal: fluffy)
print(fluffy.purr())

let rex = Dog(name: "Rex")
shelter.addAnimal(animal: rex)
print(rex.fetchBall())

let tweety = Bird(name: "Tweety")
shelter.addAnimal(animal: tweety)
print(tweety.fly())

let penguin = Bird(name: "Penny", canFly: false)
shelter.addAnimal(animal: penguin)
print(penguin.fly())

// List all animals
shelter.listAnimals()

// Swift-specific emoji
print("\nSwift programming is awesome! 🚀")
print("Swift runs on Apple devices 🍎")
print("Happy coding! 👩‍💻👨‍💻")
