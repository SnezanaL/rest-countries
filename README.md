
# username: info@vm-soft.net
# password: user1234

Deploy to gh-pages:

$ ng build --prod --base-href "https://snezanal.github.io/rest-countries/"
$ npx angular-cli-ghpages --dir=dist/rest-countries
