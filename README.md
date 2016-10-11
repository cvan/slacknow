# Slack Now

This contains the code to deploy an auto-invite and redirect service for multiple [Slack](https://slack.com/) teams. Uses the awesome [`slackin` project](https://github.com/rauchg/slackin).

To add a team, add it to the [`teams.json` file](teams.json). To generate Slack tokens, read [these instructions for Slackin](https://github.com/rauchg/slackin#npm).


## Deployment

To deploy to [Heroku](https://www.heroku.com/):

0. Ensure you have the [`heroku` command-line tool](https://devcenter.heroku.com/articles/heroku-command-line) installed.
0. Ensure you are logged in to Heroku:

    ```sh
    heroku login
    ```

0. Deploy to Heroku:

  ```sh
  npm run deploy
  ```


## License

The code in this repository is free software and is distributed under an [MIT License](LICENSE.md).
