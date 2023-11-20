export class Component {
    static async createCard({image, title, description, project_source, tags}) {
        let cardHTML = await (await fetch(new URL("static/html/projectCard.html", document.baseURI))).text();
        
        const elements = [
            {
                placeholder: "%0",
                value: image
            },
            {
                placeholder: "%1",
                value: title
            },
            {
                placeholder: "%2",
                value: description
            },
            {
                placeholder: "%3",
                value: project_source
            },
            {
                placeholder: "%4",
                value: function() {
                    let allTags = [];

                    for (const tag of tags) {
                        allTags.push([
                            "<div class=\"tag\">",
                            `   <p>${tag}</p>`,
                            "</div>"
                        ].join("\r\n"));
                    }

                    return allTags.join("\r\n");
                }
            }
        ];

        elements.forEach((el) => {
            cardHTML = cardHTML.replace(el.placeholder, el.value);
        });

        return cardHTML;
    }

    static async getCardData() {
        //?
    }
}