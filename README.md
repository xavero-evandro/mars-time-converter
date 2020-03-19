# Mars time converter

## Receive a Date in UTC format and returns Mars Sol Date (MSD) and the Martian Coordinated Time (MTC).

### Express API running on port 3000

### Docker compose file included

#### Just run

```
docker-compose up -d
```

### Standard node server

#### Just run

```
npm install
```

#### then

```
npm run start
```

## End points that goes to the same function

```
/
```

```
/:timeUTC
```

## Examples

```
localhost:3000?timeUTC=2020-03-19T18:52:55Z
```

### OR

```
localhost:3000/2020-03-19T18:52:55Z
```

## To run unit test

```
npm run tests
```

## Fell Free to improve it
