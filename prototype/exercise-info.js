/* Exercise how-to data from free-exercise-db (public domain, Unlicense)
 * https://github.com/yuhonas/free-exercise-db */
const EXERCISE_IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
const EXERCISE_INFO = {
 "Bench Press": {
  "id": "Barbell_Bench_Press_-_Medium_Grip",
  "equipment": "barbell",
  "level": "beginner",
  "primary": [
   "chest"
  ],
  "secondary": [
   "shoulders",
   "triceps"
  ],
  "steps": [
   "Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
   "From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.",
   "After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.",
   "Repeat the movement for the prescribed amount of repetitions.",
   "When you are done, place the bar back in the rack."
  ],
  "images": [
   "Barbell_Bench_Press_-_Medium_Grip/0.jpg",
   "Barbell_Bench_Press_-_Medium_Grip/1.jpg"
  ]
 },
 "Overhead Press": {
  "id": "Standing_Military_Press",
  "equipment": "barbell",
  "level": "beginner",
  "primary": [
   "shoulders"
  ],
  "secondary": [
   "triceps"
  ],
  "steps": [
   "Start by placing a barbell that is about chest high on a squat rack. Once you have selected the weights, grab the barbell using a pronated (palms facing forward) grip. Make sure to grip the bar wider than shoulder width apart from each other.",
   "Slightly bend the knees and place the barbell on your collar bone. Lift the barbell up keeping it lying on your chest. Take a step back and position your feet shoulder width apart from each other.",
   "Once you pick up the barbell with the correct grip length, lift the bar up over your head by locking your arms. Hold at about shoulder level and slightly in front of your head. This is your starting position.",
   "Lower the bar down to the collarbone slowly as you inhale.",
   "Lift the bar back up to the starting position as you exhale.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Standing_Military_Press/0.jpg",
   "Standing_Military_Press/1.jpg"
  ]
 },
 "Incline DB Press": {
  "id": "Incline_Dumbbell_Press",
  "equipment": "dumbbell",
  "level": "beginner",
  "primary": [
   "chest"
  ],
  "secondary": [
   "shoulders",
   "triceps"
  ],
  "steps": [
   "Lie back on an incline bench with a dumbbell in each hand atop your thighs. The palms of your hands will be facing each other.",
   "Then, using your thighs to help push the dumbbells up, lift the dumbbells one at a time so that you can hold them at shoulder width.",
   "Once you have the dumbbells raised to shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. This will be your starting position.",
   "Be sure to keep full control of the dumbbells at all times. Then breathe out and push the dumbbells up with your chest.",
   "Lock your arms at the top, hold for a second, and then start slowly lowering the weight. Tip Ideally, lowering the weights should take about twice as long as raising them.",
   "Repeat the movement for the prescribed amount of repetitions.",
   "When you are done, place the dumbbells back on your thighs and then on the floor. This is the safest manner to release the dumbbells."
  ],
  "images": [
   "Incline_Dumbbell_Press/0.jpg",
   "Incline_Dumbbell_Press/1.jpg"
  ]
 },
 "Triceps Pushdown": {
  "id": "Triceps_Pushdown",
  "equipment": "cable",
  "level": "beginner",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "steps": [
   "Attach a straight or angled bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width.",
   "Standing upright with the torso straight and a very small inclination forward, bring the upper arms close to your body and perpendicular to the floor. The forearms should be pointing up towards the pulley as they hold the bar. This is your starting position.",
   "Using the triceps, bring the bar down until it touches the front of your thighs and the arms are fully extended perpendicular to the floor. The upper arms should always remain stationary next to your torso and only the forearms should move. Exhale as you perform this movement.",
   "After a second hold at the contracted position, bring the bar slowly up to the starting point. Breathe in as you perform this step.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Triceps_Pushdown/0.jpg",
   "Triceps_Pushdown/1.jpg"
  ]
 },
 "Deadlift": {
  "id": "Barbell_Deadlift",
  "equipment": "barbell",
  "level": "intermediate",
  "primary": [
   "lower back"
  ],
  "secondary": [
   "calves",
   "forearms",
   "glutes",
   "hamstrings",
   "lats",
   "middle back",
   "quadriceps",
   "traps"
  ],
  "steps": [
   "Stand in front of a loaded barbell.",
   "While keeping the back as straight as possible, bend your knees, bend forward and grasp the bar using a medium (shoulder width) overhand grip. This will be the starting position of the exercise. Tip: If it is difficult to hold on to the bar with this grip, alternate your grip or use wrist straps.",
   "While holding the bar, start the lift by pushing with your legs while simultaneously getting your torso to the upright position as you breathe out. In the upright position, stick your chest out and contract the back by bringing the shoulder blades back. Think of how the soldiers in the military look when they are in standing in attention.",
   "Go back to the starting position by bending at the knees while simultaneously leaning the torso forward at the waist while keeping the back straight. When the weights on the bar touch the floor you are back at the starting position and ready to perform another repetition.",
   "Perform the amount of repetitions prescribed in the program."
  ],
  "images": [
   "Barbell_Deadlift/0.jpg",
   "Barbell_Deadlift/1.jpg"
  ]
 },
 "Barbell Row": {
  "id": "Bent_Over_Barbell_Row",
  "equipment": "barbell",
  "level": "beginner",
  "primary": [
   "middle back"
  ],
  "secondary": [
   "biceps",
   "lats",
   "shoulders"
  ],
  "steps": [
   "Holding a barbell with a pronated grip (palms facing down), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The barbell should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position.",
   "Now, while keeping the torso stationary, breathe out and lift the barbell to you. Keep the elbows close to the body and only use the forearms to hold the weight. At the top contracted position, squeeze the back muscles and hold for a brief pause.",
   "Then inhale and slowly lower the barbell back to the starting position.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Bent_Over_Barbell_Row/0.jpg",
   "Bent_Over_Barbell_Row/1.jpg"
  ]
 },
 "Lat Pulldown": {
  "id": "Wide-Grip_Lat_Pulldown",
  "equipment": "cable",
  "level": "beginner",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "middle back",
   "shoulders"
  ],
  "steps": [
   "Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar.",
   "Grab the bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width.",
   "As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position.",
   "As you breathe out, bring the bar down until it touches your upper chest by drawing the shoulders and the upper arms down and back. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the bar; therefore do not try to pull down the bar using the forearms.",
   "After a second at the contracted position squeezing your shoulder blades together, slowly raise the bar back to the starting position when your arms are fully extended and the lats are fully stretched. Inhale during this portion of the movement.",
   "Repeat this motion for the prescribed amount of repetitions."
  ],
  "images": [
   "Wide-Grip_Lat_Pulldown/0.jpg",
   "Wide-Grip_Lat_Pulldown/1.jpg"
  ]
 },
 "Biceps Curl": {
  "id": "Dumbbell_Bicep_Curl",
  "equipment": "dumbbell",
  "level": "beginner",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "steps": [
   "Stand up straight with a dumbbell in each hand at arm's length. Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward. This will be your starting position.",
   "Now, keeping the upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps.",
   "Then, inhale and slowly begin to lower the dumbbells back to the starting position.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Dumbbell_Bicep_Curl/0.jpg",
   "Dumbbell_Bicep_Curl/1.jpg"
  ]
 },
 "Back Squat": {
  "id": "Barbell_Full_Squat",
  "equipment": "barbell",
  "level": "intermediate",
  "primary": [
   "quadriceps"
  ],
  "secondary": [
   "calves",
   "glutes",
   "hamstrings",
   "lower back"
  ],
  "steps": [
   "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just above shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it.",
   "Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso.",
   "Step away from the rack and position your legs using a shoulder-width medium stance with the toes slightly pointed out. Keep your head up at all times and maintain a straight back. This will be your starting position.",
   "Begin to slowly lower the bar by bending the knees and sitting back with your hips as you maintain a straight posture with the head up. Continue down until your hamstrings are on your calves. Inhale as you perform this portion of the movement.",
   "Begin to raise the bar as you exhale by pushing the floor with the heel or middle of your foot as you straighten the legs and extend the hips to go back to the starting position.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Barbell_Full_Squat/0.jpg",
   "Barbell_Full_Squat/1.jpg"
  ]
 },
 "Romanian Deadlift": {
  "id": "Romanian_Deadlift",
  "equipment": "barbell",
  "level": "intermediate",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "calves",
   "glutes",
   "lower back"
  ],
  "steps": [
   "Put a barbell in front of you on the ground and grab it using a pronated (palms facing down) grip that a little wider than shoulder width. Tip: Depending on the weight used, you may need wrist wraps to perform the exercise and also a raised platform in order to allow for better range of motion.",
   "Bend the knees slightly and keep the shins vertical, hips back and back straight. This will be your starting position.",
   "Keeping your back and arms completely straight at all times, use your hips to lift the bar as you exhale. Tip: The movement should not be fast but steady and under control.",
   "Once you are standing completely straight up, lower the bar by pushing the hips back, only slightly bending the knees, unlike when squatting. Tip: Take a deep breath at the start of the movement and keep your chest up. Hold your breath as you lower and exhale as you complete the movement.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Romanian_Deadlift/0.jpg",
   "Romanian_Deadlift/1.jpg"
  ]
 },
 "Leg Press": {
  "id": "Leg_Press",
  "equipment": "machine",
  "level": "beginner",
  "primary": [
   "quadriceps"
  ],
  "secondary": [
   "calves",
   "glutes",
   "hamstrings"
  ],
  "steps": [
   "Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium (shoulder width) foot stance. (Note: For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances described in the foot positioning section).",
   "Lower the safety bars holding the weighted platform in place and press the platform all the way up until your legs are fully extended in front of you. Tip: Make sure that you do not lock your knees. Your torso and the legs should make a perfect 90-degree angle. This will be your starting position.",
   "As you inhale, slowly lower the platform until your upper and lower legs make a 90-degree angle.",
   "Pushing mainly with the heels of your feet and using the quadriceps go back to the starting position as you exhale.",
   "Repeat for the recommended amount of repetitions and ensure to lock the safety pins properly once you are done. You do not want that platform falling on you fully loaded."
  ],
  "images": [
   "Leg_Press/0.jpg",
   "Leg_Press/1.jpg"
  ]
 },
 "Calf Raise": {
  "id": "Standing_Calf_Raises",
  "equipment": "machine",
  "level": "beginner",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "steps": [
   "Adjust the padded lever of the calf raise machine to fit your height.",
   "Place your shoulders under the pads provided and position your toes facing forward (or using any of the two other positions described at the beginning of the chapter). The balls of your feet should be secured on top of the calf block with the heels extending off it. Push the lever up by extending your hips and knees until your torso is standing erect. The knees should be kept with a slight bend; never locked. Toes should be facing forward, outwards or inwards as described at the beginning of the chapter. This will be your starting position.",
   "Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down.",
   "Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Standing_Calf_Raises/0.jpg",
   "Standing_Calf_Raises/1.jpg"
  ]
 },
 "Pull-up": {
  "id": "Pullups",
  "equipment": "body only",
  "level": "beginner",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "middle back"
  ],
  "steps": [
   "Grab the pull-up bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than your shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width.",
   "As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position.",
   "Pull your torso up until the bar touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar.",
   "After a second on the contracted position, start to inhale and slowly lower your torso back to the starting position when your arms are fully extended and the lats are fully stretched.",
   "Repeat this motion for the prescribed amount of repetitions."
  ],
  "images": [
   "Pullups/0.jpg",
   "Pullups/1.jpg"
  ]
 },
 "Front Squat": {
  "id": "Front_Barbell_Squat",
  "equipment": "barbell",
  "level": "expert",
  "primary": [
   "quadriceps"
  ],
  "secondary": [
   "calves",
   "glutes",
   "hamstrings"
  ],
  "steps": [
   "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the correct height is chosen and the bar is loaded, bring your arms up under the bar while keeping the elbows high and the upper arm slightly above parallel to the floor. Rest the bar on top of the deltoids and cross your arms while grasping the bar for total control.",
   "Lift the bar off the rack by first pushing with your legs and at the same time straightening your torso.",
   "Step away from the rack and position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times as looking down will get you off balance and also maintain a straight back. This will be your starting position. (Note: For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances described in the foot positioning section).",
   "Begin to slowly lower the bar by bending the knees as you maintain a straight posture with the head up. Continue down until the angle between the upper leg and the calves becomes slightly less than 90-degrees (which is the point in which the upper legs are below parallel to the floor). Inhale as you perform this portion of the movement. Tip: If you performed the exercise correctly, the front of the knees should make an imaginary straight line with the toes that is perpendicular to the front. If your knees are past that imaginary line (if they are past your toes) then you are placing undue stress on the knee and the exercise has been performed incorrectly.",
   "Begin to raise the bar as you exhale by pushing the floor mainly with the middle of your foot as you straighten the legs again and go back to the starting position.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Front_Barbell_Squat/0.jpg",
   "Front_Barbell_Squat/1.jpg"
  ]
 },
 "Hip Thrust": {
  "id": "Barbell_Hip_Thrust",
  "equipment": "barbell",
  "level": "intermediate",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "calves",
   "hamstrings"
  ],
  "steps": [
   "Begin seated on the ground with a bench directly behind you. Have a loaded barbell over your legs. Using a fat bar or having a pad on the bar can greatly reduce the discomfort caused by this exercise.",
   "Roll the bar so that it is directly above your hips, and lean back against the bench so that your shoulder blades are near the top of it.",
   "Begin the movement by driving through your feet, extending your hips vertically through the bar. Your weight should be supported by your shoulder blades and your feet. Extend as far as possible, then reverse the motion to return to the starting position."
  ],
  "images": [
   "Barbell_Hip_Thrust/0.jpg",
   "Barbell_Hip_Thrust/1.jpg"
  ]
 },
 "Lateral Raise": {
  "id": "Side_Lateral_Raise",
  "equipment": "dumbbell",
  "level": "beginner",
  "primary": [
   "shoulders"
  ],
  "secondary": [],
  "steps": [
   "Pick a couple of dumbbells and stand with a straight torso and the dumbbells by your side at arms length with the palms of the hand facing you. This will be your starting position.",
   "While maintaining the torso in a stationary position (no swinging), lift the dumbbells to your side with a slight bend on the elbow and the hands slightly tilted forward as if pouring water in a glass. Continue to go up until you arms are parallel to the floor. Exhale as you execute this movement and pause for a second at the top.",
   "Lower the dumbbells back down slowly to the starting position as you inhale.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Side_Lateral_Raise/0.jpg",
   "Side_Lateral_Raise/1.jpg"
  ]
 },
 "Face Pull": {
  "id": "Face_Pull",
  "equipment": "cable",
  "level": "intermediate",
  "primary": [
   "shoulders"
  ],
  "secondary": [
   "middle back"
  ],
  "steps": [
   "Facing a high pulley with a rope or dual handles attached, pull the weight directly towards your face, separating your hands as you do so. Keep your upper arms parallel to the ground."
  ],
  "images": [
   "Face_Pull/0.jpg",
   "Face_Pull/1.jpg"
  ]
 },
 "Dumbbell Lunge": {
  "id": "Dumbbell_Lunges",
  "equipment": "dumbbell",
  "level": "beginner",
  "primary": [
   "quadriceps"
  ],
  "secondary": [
   "calves",
   "glutes",
   "hamstrings"
  ],
  "steps": [
   "Stand with your torso upright holding two dumbbells in your hands by your sides. This will be your starting position.",
   "Step forward with your right leg around 2 feet or so from the foot being left stationary behind and lower your upper body down, while keeping the torso upright and maintaining balance. Inhale as you go down. Note: As in the other exercises, do not allow your knee to go forward beyond your toes as you come down, as this will put undue stress on the knee joint. Make sure that you keep your front shin perpendicular to the ground.",
   "Using mainly the heel of your foot, push up and go back to the starting position as you exhale.",
   "Repeat the movement for the recommended amount of repetitions and then perform with the left leg."
  ],
  "images": [
   "Dumbbell_Lunges/0.jpg",
   "Dumbbell_Lunges/1.jpg"
  ]
 },
 "Chest Fly": {
  "id": "Dumbbell_Flyes",
  "equipment": "dumbbell",
  "level": "beginner",
  "primary": [
   "chest"
  ],
  "secondary": [],
  "steps": [
   "Lie down on a flat bench with a dumbbell on each hand resting on top of your thighs. The palms of your hand will be facing each other.",
   "Then using your thighs to help raise the dumbbells, lift the dumbbells one at a time so you can hold them in front of you at shoulder width with the palms of your hands facing each other. Raise the dumbbells up like you're pressing them, but stop and hold just before you lock out. This will be your starting position.",
   "With a slight bend on your elbows in order to prevent stress at the biceps tendon, lower your arms out at both sides in a wide arc until you feel a stretch on your chest. Breathe in as you perform this portion of the movement. Tip: Keep in mind that throughout the movement, the arms should remain stationary; the movement should only occur at the shoulder joint.",
   "Return your arms back to the starting position as you squeeze your chest muscles and breathe out. Tip: Make sure to use the same arc of motion used to lower the weights.",
   "Hold for a second at the contracted position and repeat the movement for the prescribed amount of repetitions."
  ],
  "images": [
   "Dumbbell_Flyes/0.jpg",
   "Dumbbell_Flyes/1.jpg"
  ]
 },
 "Hammer Curl": {
  "id": "Hammer_Curls",
  "equipment": "dumbbell",
  "level": "beginner",
  "primary": [
   "biceps"
  ],
  "secondary": [],
  "steps": [
   "Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso.",
   "The palms of the hands should be facing your torso. This will be your starting position.",
   "Now, while holding your upper arm stationary, exhale and curl the weight forward while contracting the biceps. Continue to raise the weight until the biceps are fully contracted and the dumbbell is at shoulder level. Hold the contracted position for a brief moment as you squeeze the biceps. Tip: Focus on keeping the elbow stationary and only moving your forearm.",
   "After the brief pause, inhale and slowly begin the lower the dumbbells back down to the starting position.",
   "Repeat for the recommended amount of repetitions."
  ],
  "images": [
   "Hammer_Curls/0.jpg",
   "Hammer_Curls/1.jpg"
  ]
 }
};
