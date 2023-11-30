lint:
		npx prettier --write .
		npx eslint .
webpack:
		npx webpack serve
build:
	NODE_ENV=production npx webpack