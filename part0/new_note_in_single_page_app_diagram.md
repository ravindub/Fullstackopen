```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: user types a new note in the text box and click save
    browser->>server: POST request to https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status code : 201 created and {content: "HTML is easy", date: "2023-09-21T08:52:29.481Z"}
    deactivate server
    
