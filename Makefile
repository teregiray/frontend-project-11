lint:
		npx prettier --write .
		npx eslint . --fix
webpack:
		npx webpack serve
build:
	NODE_ENV=production npx webpack