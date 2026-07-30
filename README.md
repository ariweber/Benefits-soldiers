# Benefits-Soldiers

A system for managing soldier benefits (gift card / dining hall) and unit budgets.

## Entities & Databases

### benefits

db type: MongoDB
Reason: Because there are nested arrays and nested objects and it is also not possible to know in advance what the types will be (`details` changes per benefit type).



* _id | ObjectId
* soldierID | ObjectId
* unit | string
* budgetApproved | boolean
* currentBenefitType | string enum["giftCard", "diningHall"]
* history | array of history objects

History object:
* startDate | Date
* endDate | Date | null (null = active record)
* decisionReason | string
* benefitType | string enum["giftCard", "diningHall"]
* details | object — depends on benefitType (below)

details for giftCard:
* cardProvider | string
* monthlyValue | number (positive integer)
* validMerchants | string[]

details for diningHall:
* baseId | string (valid ObjectId)
* kosherLevel | string
* mealTimes | string[]

### budget

db type: Supabase (Postgres)
Reason: Because there is connectivity between tables — the `spend` table has a field linked to the `budget` table — the fields are known in advance and there are no nested arrays or objects, so a relational database fits both tables.

* id | PK, 
* unit | string
* benfitType | string enum["giftCard", "diningHall"]
* month | string - `YYYY-MM` format
* allocatedAmount | number

### spend

db type: Supabase (Postgres)

* id | PK 
* createdAt | date
* bedgetId | forankay - `budget.id`
* amount | number
* reason | string

## Project Structure

```
src/
├── app.js            
├── routes/           
├── controllers/      
├── services/         
├── dal/              
├── db/               
├── middlewares/      
├── validations/     
└── utils/            
```

## API Routes

- `POST /soldiers/:soldierID/benefits` - create a benefit for a soldier
- `GET /soldiers/:soldierID/benefits` - get a soldier's benefits
- `PATCH /soldiers/:soldierID/benefits` - update benefit type
- `POST /budgets` - create a budget
- `GET /budgets` - search budgets (filter by unit / month / benfitType)
- `GET /budgets/:budgetId/transactions` - get a budget's transactions
- `POST /budgets/:budgetId/spend` - record a spend against a budget

## Business Rules

- A soldier can have one active benefit - Creating duplicates returns 409.
- Updating a benefit: The active record is closed (`endDate`) and a new one is added.
- Budget is per unit + month + benefit type - Duplicates return 409.
- Spending over budget (`allocatedAmount - spentAmount`) returns 409 including the remaining amount.
- Month must be `YYYY-MM`, amounts are positive (spend amounts may be decimal, `allocatedAmount` is an integer).

## Running

```
git clone https://github.com/ariweber/Benefits-soldiers.git
cd Benefits-soldiers
npm install
cp .env.example .env   
npm start              
```

### With Docker

```
docker build -t benefits-soldiers .
docker run -p 3000:3000 --env-file .env benefits-soldiers
```
