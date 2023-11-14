export class Component {
    static async createCard({title, description, tags}) {
        let cardHTML = await (await fetch(new URL("static/js/views/projectCard.html", document.baseURI))).text();
        
        const elements = [
            {
                placeholder: "%0",
                value: title
            },
            {
                placeholder: "%1",
                value: description
            },
            {
                placeholder: "%2",
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
}