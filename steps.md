## Homework
https://github.com/ZipengChen1832/react-06-06-2025

1. Challenges at the end from "first component" - "conditional rendering"
2. Make the UI for the below todo list component. No logic needed yet, style doesn't have to perfect

- https://react.dev/learn/your-first-component
Submission:
- Take a screenshot of every section after you finish them.
- For example, Screenshot of every Challenge step
- Submit screenshot in Github Repo.

# Challenges
https://react.dev/learn/your-first-component
## Challenge 1 of 4: Export the component 
<!-- function Profile() { -->
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}

## Challenge 2 of 4: Fix the return statement 
export default function Profile() {
  <!-- return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />; -->
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
export default function Profile() {
  return (
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />
  );
}

## Challenge 3 of 4: Spot the mistake 
Something’s wrong with how the Profile component is declared and used. Can you spot the mistake? (Try to remember how React distinguishes components from the regular HTML tags!)
profile -> Profile

function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

## Challenge 4 of 4: Your own component 
export default function Congratulations() {
  return (
    <h1>Good job!</h1>
  );
}

# Importing and Exporting Components
Syntax	Export statement	                Import statement
Default	export default function Button() {}	import Button from './Button.js';
Named	export function Button() {}	        import { Button } from './Button.js';
`App.js`
import Profile from './Profile.js';
import Gallery from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
`Gallery.js`
import Profile from './Profile.js';
export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
`Profile.js`
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

# Writing Markup with JSX
https://transform.tools/html-to-jsx
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
- Fragment <></>; 
- In order </b></i> -> </i></b>; 
- Close tags: <br/><br/>
- class -> className
export default function Bio() {
  return (
    <>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br/><br/>
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </>
  );
}

# JavaScript in JSX with Curly Braces
Recap
Now you know almost everything about JSX:
    JSX attributes inside quotes are passed as strings.
    Curly braces let you bring JavaScript logic and variables into your markup.
    They work inside the JSX tag content or immediately after = in attributes.
    {{ and }} is not special syntax: it’s a JavaScript object tucked inside JSX curly braces.

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

## Challenge 1 of 3: Fix the mistake
- This code crashes with an error saying Objects are not valid as a React child:
- <h1>{person}'s Todos</h1> => <h1>{person.name}'s Todos</h1>
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <!-- <h1>{person}'s Todos</h1> -->
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

## Challenge 2 of 3: Extract information into an object 
- Extract the image URL into the person object.
const person = {
  ...,
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
};
export default function TodoList() {
  ...
      <img ... src={person.imageUrl}/>
  ...
}

## Challenge 3 of 3: Write an expression inside JSX curly braces 
In the object below, the full image URL is split into four parts: base URL, imageId, imageSize, and file extension.
We want the image URL to combine these attributes together: base URL (always 'https://i.imgur.com/'), imageId ('7vQD0fP'), imageSize ('s'), and file extension (always '.jpg'). However, something is wrong with how the <img> tag specifies its src. Can you fix it?

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
...
        src={`${baseUrl}${person.imageId}${person.imageSize}.jpg`}
...

# Passing Props to a Component
Recap
    To pass props, add them to the JSX, just like you would with HTML attributes.
    To read props, use the function Avatar({ person, size }) destructuring syntax.
    You can specify a default value like size = 100, which is used for missing and undefined props.
    You can forward all props with <Avatar {...props} /> JSX spread syntax, but don’t overuse it!
    Nested JSX like <Card><Avatar /></Card> will appear as Card component’s children prop.
    Props are read-only snapshots in time: every render receives a new version of props.
    You can’t change props. When you need interactivity, you’ll need to set state.

## Challenge 1 of 3: Extract a component 
This Gallery component contains some very similar markup for two profiles. Extract a Profile component out of it to reduce the duplication. You’ll need to choose what props to pass to it.
`App.js`
import { getImageUrl } from './utils.js';
export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
`utils.js`
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}

`App.js`
import { Profile } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        name="Maria Skłodowska-Curie"
        imageId="szV5sdG"
        profession="physicist and chemist"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
        discovery="polonium (chemical element)"
      />
      <Profile
        name="Katsuko Saruhashi"
        imageId="YfeOqp2"
        profession="geochemist"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
        discovery="a method for measuring carbon dioxide in seawater"
      />
    </div>
  );
}
`utils.js`
function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}

export function Profile({ name, imageId, profession, awards, discovery }) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={70}
        height={70}
      />
      <ul>
        <li>
          <b>Profession: </b>
          {profession}
        </li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

## Challenge 2 of 3: Adjust the image size based on a prop 
In this example, Avatar receives a numeric size prop which determines the <img> width and height. The size prop is set to 40 in this example. However, if you open the image in a new tab, you’ll notice that the image itself is larger (160 pixels). The real image size is determined by which thumbnail size you’re requesting.

Change the Avatar component to request the closest image size based on the size prop. Specifically, if the size is less than 90, pass 's' (“small”) rather than 'b' (“big”) to the getImageUrl function. Verify that your changes work by rendering avatars with different values of the size prop and opening images in a new tab.
`App.js`
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  const closestImgSize = size < 90 ? 's':'b';
  return (
    <img
      className="avatar"
      src={getImageUrl(person,closestImgSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={160}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </div>
  );
}

## Challenge 3 of 3: Passing JSX in a children prop 
Extract a Card component from the markup below, and use the children prop to pass different JSX to it:
`App.js`
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
`App.js`
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
      </Card>
      <Card>
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}

# Conditional Rendering
Recap
In React, you control branching logic with JavaScript.
You can return a JSX expression conditionally with an if statement.
You can conditionally save some JSX to a variable and then include it inside other JSX by using the curly braces.
In JSX, {cond ? <A /> : <B />} means “if cond, render <A />, otherwise <B />”.
In JSX, {cond && <A />} means “if cond, render <A />, otherwise nothing”.
The shortcuts are common, but you don’t have to use them if you prefer plain if.

## Challenge 1 of 3: Show an icon for incomplete items with ? : 
Use the conditional operator (cond ? a : b) to render a ❌ if isPacked isn’t true.
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? ' ✅': ' ❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
## Challenge 2 of 3: Show the item importance with && 
In this example, each Item receives a numerical importance prop. Use the && operator to render “(Importance: X)” in italics, but only for items that have non-zero importance. Your item list should end up looking like this:

Space suit (Importance: 9)
Helmet with a golden leaf
Photo of Tam (Importance: 6)
Don’t forget to add a space between the two labels!

function Item({ name, importance }) {
  return (
    <li className="item">
      {name} {importance !== 0 && `(Importance: ${importance})`}
    </li>
  );
}

## Challenge 3 of 3: Refactor a series of ? : to if and variables 
This Drink component uses a series of ? : conditions to show different information depending on whether the name prop is "tea" or "coffee". The problem is that the information about each drink is spread across multiple conditions. Refactor this code to use a single if statement instead of three ? : conditions.

function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}
<!-- Refactor -->
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}

