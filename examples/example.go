package main

import (
	"fmt"
	"math/rand"
	"time"
)

// Example Go file with emojis for testing the VS Code Emoji to Unicode Converter extension

// Food represents a food item with an emoji
type Food struct {
	Name  string
	Emoji string
	Type  string
}

// FoodService manages food-related operations 🍽️
type FoodService struct {
	Foods []Food
}

// NewFoodService creates a new food service with sample foods
func NewFoodService() *FoodService {
	foods := []Food{
		{Name: "Apple", Emoji: "🍎", Type: "Fruit"},
		{Name: "Banana", Emoji: "🍌", Type: "Fruit"},
		{Name: "Pizza", Emoji: "🍕", Type: "Fast Food"},
		{Name: "Burger", Emoji: "🍔", Type: "Fast Food"},
		{Name: "Sushi", Emoji: "🍣", Type: "Seafood"},
		{Name: "Taco", Emoji: "🌮", Type: "Mexican"},
		{Name: "Ice Cream", Emoji: "🍦", Type: "Dessert"},
		{Name: "Salad", Emoji: "🥗", Type: "Healthy"},
		{Name: "Pasta", Emoji: "🍝", Type: "Italian"},
		{Name: "Cake", Emoji: "🎂", Type: "Dessert"},
	}
	
	return &FoodService{
		Foods: foods,
	}
}

// GetRandomFood returns a random food 🎲
func (fs *FoodService) GetRandomFood() Food {
	rand.Seed(time.Now().UnixNano())
	index := rand.Intn(len(fs.Foods))
	return fs.Foods[index]
}

// GetFoodsByType returns all foods of a given type 🔍
func (fs *FoodService) GetFoodsByType(foodType string) []Food {
	var result []Food
	
	for _, food := range fs.Foods {
		if food.Type == foodType {
			result = append(result, food)
		}
	}
	
	return result
}

// DisplayFood prints a food with its emoji
func DisplayFood(food Food) {
	fmt.Printf("%s %s (%s)\n", food.Emoji, food.Name, food.Type)
}

func main() {
	fmt.Println("Welcome to the Go Food Service! 👋")
	
	// Create a new food service
	foodService := NewFoodService()
	
	// Get and display a random food
	fmt.Println("\nRandom food recommendation:")
	randomFood := foodService.GetRandomFood()
	DisplayFood(randomFood)
	
	// Get and display desserts
	fmt.Println("\nAll desserts:")
	desserts := foodService.GetFoodsByType("Dessert")
	for _, dessert := range desserts {
		DisplayFood(dessert)
	}
	
	// Get and display fruits
	fmt.Println("\nAll fruits:")
	fruits := foodService.GetFoodsByType("Fruit")
	for _, fruit := range fruits {
		DisplayFood(fruit)
	}
	
	fmt.Println("\nGo is fun to program in! 🚀")
	fmt.Println("Happy coding! 💻")
}
