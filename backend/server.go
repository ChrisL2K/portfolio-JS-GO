package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"backend/src"

	"github.com/labstack/echo"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	var echo = echo.New()

	var db, err = sql.Open("sqlite3", "./src/db/portfolio.db")
	defer db.Close()
	if err != nil {
		fmt.Println("Problem opening database:", err)
		return
	} else {
		src.CreateTables(db)
	}

	echo.GET("/projects/all", getProjects)

	fmt.Println("Echo running...")
}

func getProjects(context echo.Context) error {
	// Function not yet implemented
	var x = 4
	return context.JSON(http.StatusOK, x)
}
