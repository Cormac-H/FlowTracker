# Intro

Flowtracker to highlight a tainted flow path

## Features

- Reads numbers in the format xx xx where x = any 0-9 number and a whitespace seperates them

- Numbers can be read from anywhere, however this has been designed for the flow to be appended as a commented section in the target file

- The program assumes the tainted flow given is being highlighted in the current file and not a seperate file

- Sample C files have been included

    - In the samples the first Tainted Flow has had an extra whitespace added to each number pair - remove this whitespace in order to track the flow
    - Multiple flows can be conducted but this can appear confusing visually

## Requirements

- Requires npm to be installed prior to use
