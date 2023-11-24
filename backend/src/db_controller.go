package src

import "database/sql"

type project struct {
	Id    int      "json:'id'"
	Title string   "json:'title'"
	Desc  string   "json:'description'"
	Img   string   "json:'img_src'"
	Link  string   "json:'git_link'"
	Tags  []string "json:'tags'"
}

func CreateTables(db *sql.DB) {
	var query = `
		CREATE TABLE IF NOT EXISTS Projects (
			project_id INTEGER PRIMARY KEY,
			title TEXT,
			desc TEXT,
			img_src TEXT,
			git_link TEXT
		);

		CREATE TABLE IF NOT EXISTS Tags (
			tag_id INTEGER PRIMARY KEY,
			tag_word TEXT
		);

		CREATE TABLE IF NOT EXISTS Projects_Tags_Junction (
			project_id INTEGER,
			tag_id INTEGER,
			PRIMARY KEY (project_id, tag_id),
			FOREIGN KEY (project_id) REFERENCES Projects(project_id),
			FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
		);
	`
	db.Exec(query)
}
