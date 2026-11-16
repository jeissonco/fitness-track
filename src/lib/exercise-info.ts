/* Exercise how-to data from free-exercise-db (public domain, Unlicense)
 * https://github.com/yuhonas/free-exercise-db */

export interface ExerciseInfo {
  id: string;
  equipment: string;
  level: string;
  primary: string[];
  secondary: string[];
  steps: string[];
  images: string[];
}

export const EXERCISE_IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

export const EXERCISE_INFO: Record<string, ExerciseInfo> = {
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
  },
  "Dumbbell Bench Press": {
    "id": "Dumbbell_Bench_Press",
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
      "Lie down on a flat bench with a dumbbell in each hand resting on top of your thighs. The palms of your hands will be facing each other.",
      "Then, using your thighs to help raise the dumbbells up, lift the dumbbells one at a time so that you can hold them in front of you at shoulder width.",
      "Once at shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. The dumbbells should be just to the sides of your chest, with your upper arm and forearm creating a 90 degree angle. Be sure to maintain full control of the dumbbells at all times. This will be your starting position.",
      "Then, as you breathe out, use your chest to push the dumbbells up. Lock your arms at the top of the lift and squeeze your chest, hold for a second and then begin coming down slowly. Tip: Ideally, lowering the weight should take about twice as long as raising it.",
      "Repeat the movement for the prescribed amount of repetitions of your training program."
    ],
    "images": [
      "Dumbbell_Bench_Press/0.jpg",
      "Dumbbell_Bench_Press/1.jpg"
    ]
  },
  "Dumbbell Floor Press": {
    "id": "Dumbbell_Floor_Press",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "triceps"
    ],
    "secondary": [
      "chest",
      "shoulders"
    ],
    "steps": [
      "Lay on the floor holding dumbbells in your hands. Your knees can be bent. Begin with the weights fully extended above you.",
      "Lower the weights until your upper arm comes in contact with the floor. You can tuck your elbows to emphasize triceps size and strength, or to focus on your chest angle your arms to the side.",
      "Pause at the bottom, and then bring the weight together at the top by extending through the elbows."
    ],
    "images": [
      "Dumbbell_Floor_Press/0.jpg",
      "Dumbbell_Floor_Press/1.jpg"
    ]
  },
  "Dumbbell Shoulder Press": {
    "id": "Dumbbell_Shoulder_Press",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "shoulders"
    ],
    "secondary": [
      "triceps"
    ],
    "steps": [
      "While holding a dumbbell in each hand, sit on a military press bench or utility bench that has back support. Place the dumbbells upright on top of your thighs.",
      "Now raise the dumbbells to shoulder height one at a time using your thighs to help propel them up into position.",
      "Make sure to rotate your wrists so that the palms of your hands are facing forward. This is your starting position.",
      "Now, exhale and push the dumbbells upward until they touch at the top.",
      "Then, after a brief pause at the top contracted position, slowly lower the weights back down to the starting position while inhaling.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Dumbbell_Shoulder_Press/0.jpg",
      "Dumbbell_Shoulder_Press/1.jpg"
    ]
  },
  "Arnold Press": {
    "id": "Arnold_Dumbbell_Press",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "shoulders"
    ],
    "secondary": [
      "triceps"
    ],
    "steps": [
      "Sit on an exercise bench with back support and hold two dumbbells in front of you at about upper chest level with your palms facing your body and your elbows bent. Tip: Your arms should be next to your torso. The starting position should look like the contracted portion of a dumbbell curl.",
      "Now to perform the movement, raise the dumbbells as you rotate the palms of your hands until they are facing forward.",
      "Continue lifting the dumbbells until your arms are extended above you in straight arm position. Breathe out as you perform this portion of the movement.",
      "After a second pause at the top, begin to lower the dumbbells to the original position by rotating the palms of your hands towards you. Tip: The left arm will be rotated in a counter clockwise manner while the right one will be rotated clockwise. Breathe in as you perform this portion of the movement.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Arnold_Dumbbell_Press/0.jpg",
      "Arnold_Dumbbell_Press/1.jpg"
    ]
  },
  "One-Arm Dumbbell Row": {
    "id": "One-Arm_Dumbbell_Row",
    "equipment": "dumbbell",
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
      "Choose a flat bench and place a dumbbell on each side of it.",
      "Place the right leg on top of the end of the bench, bend your torso forward from the waist until your upper body is parallel to the floor, and place your right hand on the other end of the bench for support.",
      "Use the left hand to pick up the dumbbell on the floor and hold the weight while keeping your lower back straight. The palm of the hand should be facing your torso. This will be your starting position.",
      "Pull the resistance straight up to the side of your chest, keeping your upper arm close to your side and keeping the torso stationary. Breathe out as you perform this step. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. Also, make sure that the force is performed with the back muscles and not the arms. Finally, the upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the dumbbell; therefore do not try to pull the dumbbell up using the forearms.",
      "Lower the resistance straight down to the starting position. Breathe in as you perform this step.",
      "Repeat the movement for the specified amount of repetitions.",
      "Switch sides and repeat again with the other arm."
    ],
    "images": [
      "One-Arm_Dumbbell_Row/0.jpg",
      "One-Arm_Dumbbell_Row/1.jpg"
    ]
  },
  "Dumbbell Pullover": {
    "id": "Bent-Arm_Dumbbell_Pullover",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "chest"
    ],
    "secondary": [
      "lats",
      "shoulders",
      "triceps"
    ],
    "steps": [
      "Place a dumbbell standing up on a flat bench.",
      "Ensuring that the dumbbell stays securely placed at the top of the bench, lie perpendicular to the bench (torso across it as in forming a cross) with only your shoulders lying on the surface. Hips should be below the bench and legs bent with feet firmly on the floor. The head will be off the bench as well.",
      "Grasp the dumbbell with both hands and hold it straight over your chest with a bend in your arms. Both palms should be pressing against the underside one of the sides of the dumbbell. This will be your starting position. Caution: Always ensure that the dumbbell used for this exercise is secure. Using a dumbbell with loose plates can result in the dumbbell falling apart and falling on your face.",
      "While keeping your arms locked in the bent arm position, lower the weight slowly in an arc behind your head while breathing in until you feel a stretch on the chest.",
      "At that point, bring the dumbbell back to the starting position using the arc through which the weight was lowered and exhale as you perform this movement.",
      "Hold the weight on the initial position for a second and repeat the motion for the prescribed number of repetitions."
    ],
    "images": [
      "Bent-Arm_Dumbbell_Pullover/0.jpg",
      "Bent-Arm_Dumbbell_Pullover/1.jpg"
    ]
  },
  "Goblet Squat": {
    "id": "Goblet_Squat",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "quadriceps"
    ],
    "secondary": [
      "calves",
      "glutes",
      "hamstrings",
      "shoulders"
    ],
    "steps": [
      "Stand holding a light kettlebell by the horns close to your chest. This will be your starting position.",
      "Squat down between your legs until your hamstrings are on your calves. Keep your chest and head up and your back straight.",
      "At the bottom position, pause and use your elbows to push your knees out. Return to the starting position, and repeat for 10-20 repetitions."
    ],
    "images": [
      "Goblet_Squat/0.jpg",
      "Goblet_Squat/1.jpg"
    ]
  },
  "Dumbbell Squat": {
    "id": "Dumbbell_Squat",
    "equipment": "dumbbell",
    "level": "beginner",
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
      "Stand up straight while holding a dumbbell on each hand (palms facing the side of your legs).",
      "Position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times as looking down will get you off balance and also maintain a straight back. This will be your starting position. Note: For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances discussed in the foot stances section.",
      "Begin to slowly lower your torso by bending the knees as you maintain a straight posture with the head up. Continue down until your thighs are parallel to the floor. Tip: If you performed the exercise correctly, the front of the knees should make an imaginary straight line with the toes that is perpendicular to the front. If your knees are past that imaginary line (if they are past your toes) then you are placing undue stress on the knee and the exercise has been performed incorrectly.",
      "Begin to raise your torso as you exhale by pushing the floor with the heel of your foot mainly as you straighten the legs again and go back to the starting position.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Dumbbell_Squat/0.jpg",
      "Dumbbell_Squat/1.jpg"
    ]
  },
  "Dumbbell Romanian Deadlift": {
    "id": "Stiff-Legged_Dumbbell_Deadlift",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "hamstrings"
    ],
    "secondary": [
      "glutes",
      "lower back"
    ],
    "steps": [
      "Grasp a couple of dumbbells holding them by your side at arm's length.",
      "Stand with your torso straight and your legs spaced using a shoulder width or narrower stance. The knees should be slightly bent. This is your starting position.",
      "Keeping the knees stationary, lower the dumbbells to over the top of your feet by bending at the waist while keeping your back straight. Keep moving forward as if you were going to pick something from the floor until you feel a stretch on the hamstrings. Exhale as you perform this movement",
      "Start bringing your torso up straight again by extending your hips and waist until you are back at the starting position. Inhale as you perform this movement.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Stiff-Legged_Dumbbell_Deadlift/0.jpg",
      "Stiff-Legged_Dumbbell_Deadlift/1.jpg"
    ]
  },
  "Dumbbell Split Squat": {
    "id": "Split_Squat_with_Dumbbells",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "quadriceps"
    ],
    "secondary": [
      "glutes",
      "hamstrings"
    ],
    "steps": [
      "Position yourself into a staggered stance with the rear foot elevated and front foot forward.",
      "Hold a dumbbell in each hand, letting them hang at the sides. This will be your starting position.",
      "Begin by descending, flexing your knee and hip to lower your body down. Maintain good posture througout the movement. Keep the front knee in line with the foot as you perform the exercise.",
      "At the bottom of the movement, drive through the heel to extend the knee and hip to return to the starting position."
    ],
    "images": [
      "Split_Squat_with_Dumbbells/0.jpg",
      "Split_Squat_with_Dumbbells/1.jpg"
    ]
  },
  "Dumbbell Reverse Lunge": {
    "id": "Dumbbell_Rear_Lunge",
    "equipment": "dumbbell",
    "level": "intermediate",
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
      "Step backward with your right leg around two feet or so from the left foot and lower your upper body down, while keeping the torso upright and maintaining balance. Inhale as you go down. Tip: As in the other exercises, do not allow your knee to go forward beyond your toes as you come down, as this will put undue stress on the knee joint. Make sure that you keep your front shin perpendicular to the ground. Keep the torso upright during the lunge; flexible hip flexors are important. A long lunge emphasizes the Gluteus Maximus; a short lunge emphasizes Quadriceps.",
      "Push up and go back to the starting position as you exhale. Tip: Use the ball of your feet to push in order to accentuate the quadriceps. To focus on the glutes, press with your heels.",
      "Now repeat with the opposite leg."
    ],
    "images": [
      "Dumbbell_Rear_Lunge/0.jpg",
      "Dumbbell_Rear_Lunge/1.jpg"
    ]
  },
  "Dumbbell Step-up": {
    "id": "Dumbbell_Step_Ups",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "quadriceps"
    ],
    "secondary": [
      "calves",
      "glutes",
      "hamstrings"
    ],
    "steps": [
      "Stand up straight while holding a dumbbell on each hand (palms facing the side of your legs).",
      "Place the right foot on the elevated platform. Step on the platform by extending the hip and the knee of your right leg. Use the heel mainly to lift the rest of your body up and place the foot of the left leg on the platform as well. Breathe out as you execute the force required to come up.",
      "Step down with the left leg by flexing the hip and knee of the right leg as you inhale. Return to the original standing position by placing the right foot of to next to the left foot on the initial position.",
      "Repeat with the right leg for the recommended amount of repetitions and then perform with the left leg."
    ],
    "images": [
      "Dumbbell_Step_Ups/0.jpg",
      "Dumbbell_Step_Ups/1.jpg"
    ]
  },
  "Dumbbell Calf Raise": {
    "id": "Standing_Dumbbell_Calf_Raise",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "calves"
    ],
    "secondary": [],
    "steps": [
      "Stand with your torso upright holding two dumbbells in your hands by your sides. Place the ball of the foot on a sturdy and stable wooden board (that is around 2-3 inches tall) while your heels extend off and touch the floor. This will be your starting position.",
      "With the toes pointing either straight (to hit all parts equally), inwards (for emphasis on the outer head) or outwards (for emphasis on the inner head), raise the heels off the floor as you exhale by contracting the calves. Hold the top contraction for a second.",
      "As you inhale, go back to the starting position by slowly lowering the heels.",
      "Repeat for the recommended amount of times."
    ],
    "images": [
      "Standing_Dumbbell_Calf_Raise/0.jpg",
      "Standing_Dumbbell_Calf_Raise/1.jpg"
    ]
  },
  "Front Raise": {
    "id": "Front_Dumbbell_Raise",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "shoulders"
    ],
    "secondary": [],
    "steps": [
      "Pick a couple of dumbbells and stand with a straight torso and the dumbbells on front of your thighs at arms length with the palms of the hand facing your thighs. This will be your starting position.",
      "While maintaining the torso stationary (no swinging), lift the left dumbbell to the front with a slight bend on the elbow and the palms of the hands always facing down. Continue to go up until you arm is slightly above parallel to the floor. Exhale as you execute this portion of the movement and pause for a second at the top. Inhale after the second pause.",
      "Now lower the dumbbell back down slowly to the starting position as you simultaneously lift the right dumbbell.",
      "Continue alternating in this fashion until all of the recommended amount of repetitions have been performed for each arm."
    ],
    "images": [
      "Front_Dumbbell_Raise/0.jpg",
      "Front_Dumbbell_Raise/1.jpg"
    ]
  },
  "Rear Delt Fly": {
    "id": "Reverse_Flyes",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "shoulders"
    ],
    "secondary": [],
    "steps": [
      "To begin, lie down on an incline bench with the chest and stomach pressing against the incline. Have the dumbbells in each hand with the palms facing each other (neutral grip).",
      "Extend the arms in front of you so that they are perpendicular to the angle of the bench. The legs should be stationary while applying pressure with the ball of your toes. This is the starting position.",
      "Maintaining the slight bend of the elbows, move the weights out and away from each other (to the side) in an arc motion while exhaling. Tip: Try to squeeze your shoulder blades together to get the best results from this exercise.",
      "The arms should be elevated until they are parallel to the floor.",
      "Feel the contraction and slowly lower the weights back down to the starting position while inhaling.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Reverse_Flyes/0.jpg",
      "Reverse_Flyes/1.jpg"
    ]
  },
  "Dumbbell Shrug": {
    "id": "Dumbbell_Shrug",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "traps"
    ],
    "secondary": [],
    "steps": [
      "Stand erect with a dumbbell on each hand (palms facing your torso), arms extended on the sides.",
      "Lift the dumbbells by elevating the shoulders as high as possible while you exhale. Hold the contraction at the top for a second. Tip: The arms should remain extended at all times. Refrain from using the biceps to help lift the dumbbells. Only the shoulders should be moving up and down.",
      "Lower the dumbbells back to the original position.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Dumbbell_Shrug/0.jpg",
      "Dumbbell_Shrug/1.jpg"
    ]
  },
  "Overhead Triceps Extension": {
    "id": "Standing_Dumbbell_Triceps_Extension",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "triceps"
    ],
    "secondary": [],
    "steps": [
      "To begin, stand up with a dumbbell held by both hands. Your feet should be about shoulder width apart from each other. Slowly use both hands to grab the dumbbell and lift it over your head until both arms are fully extended.",
      "The resistance should be resting in the palms of your hands with your thumbs around it. The palm of the hands should be facing up towards the ceiling. This will be your starting position.",
      "Keeping your upper arms close to your head with elbows in and perpendicular to the floor, lower the resistance in a semicircular motion behind your head until your forearms touch your biceps. Tip: The upper arms should remain stationary and only the forearms should move. Breathe in as you perform this step.",
      "Go back to the starting position by using the triceps to raise the dumbbell. Breathe out as you perform this step.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Standing_Dumbbell_Triceps_Extension/0.jpg",
      "Standing_Dumbbell_Triceps_Extension/1.jpg"
    ]
  },
  "Triceps Kickback": {
    "id": "Tricep_Dumbbell_Kickback",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "triceps"
    ],
    "secondary": [],
    "steps": [
      "Start with a dumbbell in each hand and your palms facing your torso. Keep your back straight with a slight bend in the knees and bend forward at the waist. Your torso should be almost parallel to the floor. Make sure to keep your head up. Your upper arms should be close to your torso and parallel to the floor. Your forearms should be pointed towards the floor as you hold the weights. There should be a 90-degree angle formed between your forearm and upper arm. This is your starting position.",
      "Now, while keeping your upper arms stationary, exhale and use your triceps to lift the weights until the arm is fully extended. Focus on moving the forearm.",
      "After a brief pause at the top contraction, inhale and slowly lower the dumbbells back down to the starting position.",
      "Repeat the movement for the prescribed amount of repetitions."
    ],
    "images": [
      "Tricep_Dumbbell_Kickback/0.jpg",
      "Tricep_Dumbbell_Kickback/1.jpg"
    ]
  },
  "Concentration Curl": {
    "id": "Concentration_Curls",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "biceps"
    ],
    "secondary": [
      "forearms"
    ],
    "steps": [
      "Sit down on a flat bench with one dumbbell in front of you between your legs. Your legs should be spread with your knees bent and feet on the floor.",
      "Use your right arm to pick the dumbbell up. Place the back of your right upper arm on the top of your inner right thigh. Rotate the palm of your hand until it is facing forward away from your thigh. Tip: Your arm should be extended and the dumbbell should be above the floor. This will be your starting position.",
      "While holding the upper arm stationary, curl the weights forward while contracting the biceps as you breathe out. Only the forearms should move. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Tip: At the top of the movement make sure that the little finger of your arm is higher than your thumb. This guarantees a good contraction. Hold the contracted position for a second as you squeeze the biceps.",
      "Slowly begin to bring the dumbbells back to starting position as your breathe in. Caution: Avoid swinging motions at any time.",
      "Repeat for the recommended amount of repetitions. Then repeat the movement with the left arm."
    ],
    "images": [
      "Concentration_Curls/0.jpg",
      "Concentration_Curls/1.jpg"
    ]
  },
  "Incline Dumbbell Curl": {
    "id": "Incline_Dumbbell_Curl",
    "equipment": "dumbbell",
    "level": "beginner",
    "primary": [
      "biceps"
    ],
    "secondary": [],
    "steps": [
      "Sit back on an incline bench with a dumbbell in each hand held at arms length. Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward. This will be your starting position.",
      "While holding the upper arm stationary, curl the weights forward while contracting the biceps as you breathe out. Only the forearms should move. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second.",
      "Slowly begin to bring the dumbbells back to starting position as your breathe in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Incline_Dumbbell_Curl/0.jpg",
      "Incline_Dumbbell_Curl/1.jpg"
    ]
  },
  "Incline Bench Press": {
    "id": "Barbell_Incline_Bench_Press_-_Medium_Grip",
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
      "Lie back on an incline bench. Using a medium-width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
      "As you breathe in, come down slowly until you feel the bar on you upper chest.",
      "After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your chest muscles. Lock your arms in the contracted position, squeeze your chest, hold for a second and then start coming down slowly again. Tip: it should take at least twice as long to go down than to come up.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack."
    ],
    "images": [
      "Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
      "Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg"
    ]
  },
  "Dips": {
    "id": "Dips_-_Triceps_Version",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "triceps"
    ],
    "secondary": [
      "chest",
      "shoulders"
    ],
    "steps": [
      "To get into the starting position, hold your body at arm's length with your arms nearly locked above the bars.",
      "Now, inhale and slowly lower yourself downward. Your torso should remain upright and your elbows should stay close to your body. This helps to better focus on tricep involvement. Lower yourself until there is a 90 degree angle formed between the upper arm and forearm.",
      "Then, exhale and push your torso back up using your triceps to bring your body back to the starting position.",
      "Repeat the movement for the prescribed amount of repetitions."
    ],
    "images": [
      "Dips_-_Triceps_Version/0.jpg",
      "Dips_-_Triceps_Version/1.jpg"
    ]
  },
  "Push-up": {
    "id": "Pushups",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "chest"
    ],
    "secondary": [
      "shoulders",
      "triceps"
    ],
    "steps": [
      "Lie on the floor face down and place your hands about 36 inches apart while holding your torso up at arms length.",
      "Next, lower yourself downward until your chest almost touches the floor as you inhale.",
      "Now breathe out and press your upper body back up to the starting position while squeezing your chest.",
      "After a brief pause at the top contracted position, you can begin to lower yourself downward again for as many repetitions as needed."
    ],
    "images": [
      "Pushups/0.jpg",
      "Pushups/1.jpg"
    ]
  },
  "Chin-up": {
    "id": "Chin-Up",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "lats"
    ],
    "secondary": [
      "biceps",
      "forearms",
      "middle back"
    ],
    "steps": [
      "Grab the pull-up bar with the palms facing your torso and a grip closer than the shoulder width.",
      "As you have both arms extended in front of you holding the bar at the chosen grip width, keep your torso as straight as possible while creating a curvature on your lower back and sticking your chest out. This is your starting position. Tip: Keeping the torso as straight as possible maximizes biceps stimulation while minimizing back involvement.",
      "As you breathe out, pull your torso up until your head is around the level of the pull-up bar. Concentrate on using the biceps muscles in order to perform the movement. Keep the elbows close to your body. Tip: The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar.",
      "After a second of squeezing the biceps in the contracted position, slowly lower your torso back to the starting position; when your arms are fully extended. Breathe in as you perform this portion of the movement.",
      "Repeat this motion for the prescribed amount of repetitions."
    ],
    "images": [
      "Chin-Up/0.jpg",
      "Chin-Up/1.jpg"
    ]
  },
  "Seated Cable Row": {
    "id": "Seated_Cable_Rows",
    "equipment": "cable",
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
      "For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked.",
      "Lean over as you keep the natural alignment of your back and grab the V-bar handles.",
      "With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise.",
      "Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Seated_Cable_Rows/0.jpg",
      "Seated_Cable_Rows/1.jpg"
    ]
  },
  "Leg Extension": {
    "id": "Leg_Extensions",
    "equipment": "machine",
    "level": "beginner",
    "primary": [
      "quadriceps"
    ],
    "secondary": [],
    "steps": [
      "For this exercise you will need to use a leg extension machine. First choose your weight and sit on the machine with your legs under the pad (feet pointed forward) and the hands holding the side bars. This will be your starting position. Tip: You will need to adjust the pad so that it falls on top of your lower leg (just above your feet). Also, make sure that your legs form a 90-degree angle between the lower and upper leg. If the angle is less than 90-degrees then that means the knee is over the toes which in turn creates undue stress at the knee joint. If the machine is designed that way, either look for another machine or just make sure that when you start executing the exercise you stop going down once you hit the 90-degree angle.",
      "Using your quadriceps, extend your legs to the maximum as you exhale. Ensure that the rest of the body remains stationary on the seat. Pause a second on the contracted position.",
      "Slowly lower the weight back to the original position as you inhale, ensuring that you do not go past the 90-degree angle limit.",
      "Repeat for the recommended amount of times."
    ],
    "images": [
      "Leg_Extensions/0.jpg",
      "Leg_Extensions/1.jpg"
    ]
  },
  "Leg Curl": {
    "id": "Lying_Leg_Curls",
    "equipment": "machine",
    "level": "beginner",
    "primary": [
      "hamstrings"
    ],
    "secondary": [],
    "steps": [
      "Adjust the machine lever to fit your height and lie face down on the leg curl machine with the pad of the lever on the back of your legs (just a few inches under the calves). Tip: Preferably use a leg curl machine that is angled as opposed to flat since an angled position is more favorable for hamstrings recruitment.",
      "Keeping the torso flat on the bench, ensure your legs are fully stretched and grab the side handles of the machine. Position your toes straight (or you can also use any of the other two stances described on the foot positioning section). This will be your starting position.",
      "As you exhale, curl your legs up as far as possible without lifting the upper legs from the pad. Once you hit the fully contracted position, hold it for a second.",
      "As you inhale, bring the legs back to the initial position. Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Lying_Leg_Curls/0.jpg",
      "Lying_Leg_Curls/1.jpg"
    ]
  },
  "Hanging Leg Raise": {
    "id": "Hanging_Leg_Raise",
    "equipment": "body only",
    "level": "expert",
    "primary": [
      "abdominals"
    ],
    "secondary": [],
    "steps": [
      "Hang from a chin-up bar with both arms extended at arms length in top of you using either a wide grip or a medium grip. The legs should be straight down with the pelvis rolled slightly backwards. This will be your starting position.",
      "Raise your legs until the torso makes a 90-degree angle with the legs. Exhale as you perform this movement and hold the contraction for a second or so.",
      "Go back slowly to the starting position as you breathe in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Hanging_Leg_Raise/0.jpg",
      "Hanging_Leg_Raise/1.jpg"
    ]
  },
  "Cable Crunch": {
    "id": "Cable_Crunch",
    "equipment": "cable",
    "level": "beginner",
    "primary": [
      "abdominals"
    ],
    "secondary": [],
    "steps": [
      "Kneel below a high pulley that contains a rope attachment.",
      "Grasp cable rope attachment and lower the rope until your hands are placed next to your face.",
      "Flex your hips slightly and allow the weight to hyperextend the lower back. This will be your starting position.",
      "With the hips stationary, flex the waist as you contract the abs so that the elbows travel towards the middle of the thighs. Exhale as you perform this portion of the movement and hold the contraction for a second.",
      "Slowly return to the starting position as you inhale. Tip: Make sure that you keep constant tension on the abs throughout the movement. Also, do not choose a weight so heavy that the lower back handles the brunt of the work.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Cable_Crunch/0.jpg",
      "Cable_Crunch/1.jpg"
    ]
  },
  "Glute Bridge": {
    "id": "Butt_Lift_Bridge",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "glutes"
    ],
    "secondary": [
      "hamstrings"
    ],
    "steps": [
      "Lie flat on the floor on your back with the hands by your side and your knees bent. Your feet should be placed around shoulder width. This will be your starting position.",
      "Pushing mainly with your heels, lift your hips off the floor while keeping your back straight. Breathe out as you perform this part of the motion and hold at the top for a second.",
      "Slowly go back to the starting position as you breathe in."
    ],
    "images": [
      "Butt_Lift_Bridge/0.jpg",
      "Butt_Lift_Bridge/1.jpg"
    ]
  },
  "Hip Abduction": {
    "id": "Thigh_Abductor",
    "equipment": "machine",
    "level": "beginner",
    "primary": [
      "abductors"
    ],
    "secondary": [
      "glutes"
    ],
    "steps": [
      "To begin, sit down on the abductor machine and select a weight you are comfortable with. When your legs are positioned properly, grip the handles on each side. Your entire upper body (from the waist up) should be stationary. This is the starting position.",
      "Slowly press against the machine with your legs to move them away from each other while exhaling.",
      "Feel the contraction for a second and begin to move your legs back to the starting position while breathing in. Note: Remember to keep your upper body stationary to prevent any injuries from occurring.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Thigh_Abductor/0.jpg",
      "Thigh_Abductor/1.jpg"
    ]
  },
  "Cable Kickback": {
    "id": "One-Legged_Cable_Kickback",
    "equipment": "cable",
    "level": "intermediate",
    "primary": [
      "glutes"
    ],
    "secondary": [
      "hamstrings"
    ],
    "steps": [
      "Hook a leather ankle cuff to a low cable pulley and then attach the cuff to your ankle.",
      "Face the weight stack from a distance of about two feet, grasping the steel frame for support.",
      "While keeping your knees and hips bent slightly and your abs tight, contract your glutes to slowly \"kick\" the working leg back in a semicircular arc as high as it will comfortably go as you breathe out. Tip: At full extension, squeeze your glutes for a second in order to achieve a peak contraction.",
      "Now slowly bring your working leg forward, resisting the pull of the cable until you reach the starting position.",
      "Repeat for the recommended amount of repetitions.",
      "Switch legs and repeat the movement for the other side."
    ],
    "images": [
      "One-Legged_Cable_Kickback/0.jpg",
      "One-Legged_Cable_Kickback/1.jpg"
    ]
  },
  "Back Extension": {
    "id": "Hyperextensions_Back_Extensions",
    "equipment": "machine",
    "level": "beginner",
    "primary": [
      "lower back"
    ],
    "secondary": [
      "glutes",
      "hamstrings"
    ],
    "steps": [
      "Lie face down on a hyperextension bench, tucking your ankles securely under the footpads.",
      "Adjust the upper pad if possible so your upper thighs lie flat across the wide pad, leaving enough room for you to bend at the waist without any restriction.",
      "With your body straight, cross your arms in front of you (my preference) or behind your head. This will be your starting position. Tip: You can also hold a weight plate for extra resistance in front of you under your crossed arms.",
      "Start bending forward slowly at the waist as far as you can while keeping your back flat. Inhale as you perform this movement. Keep moving forward until you feel a nice stretch on the hamstrings and you can no longer keep going without a rounding of the back. Tip: Never round the back as you perform this exercise. Also, some people can go farther than others. The key thing is that you go as far as your body allows you to without rounding the back.",
      "Slowly raise your torso back to the initial position as you inhale. Tip: Avoid the temptation to arch your back past a straight line. Also, do not swing the torso at any time in order to protect the back from injury.",
      "Repeat for the recommended amount of repetitions."
    ],
    "images": [
      "Hyperextensions_Back_Extensions/0.jpg",
      "Hyperextensions_Back_Extensions/1.jpg"
    ]
  },
  "Single-leg Romanian Deadlift": {
    "id": "Kettlebell_One-Legged_Deadlift",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primary": [
      "hamstrings"
    ],
    "secondary": [
      "glutes",
      "lower back"
    ],
    "steps": [
      "Hold a kettlebell by the handle in one hand. Stand on one leg, on the same side that you hold the kettlebell.",
      "Keeping that knee slightly bent, perform a stiff legged deadlift by bending at the hip, extending your free leg behind you for balance.",
      "Continue lowering the kettlebell until you are parallel to the ground, and then return to the upright position."
    ],
    "images": [
      "Kettlebell_One-Legged_Deadlift/0.jpg",
      "Kettlebell_One-Legged_Deadlift/1.jpg"
    ]
  },
  "Walking Lunge": {
    "id": "Bodyweight_Walking_Lunge",
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
      "Begin standing with your feet shoulder width apart and your hands on your hips.",
      "Step forward with one leg, flexing the knees to drop your hips. Descend until your rear knee nearly touches the ground. Your posture should remain upright, and your front knee should stay above the front foot.",
      "Drive through the heel of your lead foot and extend both knees to raise yourself back up.",
      "Step forward with your rear foot, repeating the lunge on the opposite leg."
    ],
    "images": [
      "Bodyweight_Walking_Lunge/0.jpg",
      "Bodyweight_Walking_Lunge/1.jpg"
    ]
  },
  "Plank": {
    "id": "Plank",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "abdominals"
    ],
    "secondary": [],
    "steps": [
      "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder.",
      "Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised."
    ],
    "images": [
      "Plank/0.jpg",
      "Plank/1.jpg"
    ]
  },
  "Side Plank": {
    "id": "Side_Bridge",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "abdominals"
    ],
    "secondary": [
      "shoulders"
    ],
    "steps": [
      "Lie on your side with your legs straight and stacked, and your elbow directly under your shoulder.",
      "Lift your hips until your body forms a straight line from head to feet. Keep your neck in line and your hips from rolling forward or back.",
      "Breathe steadily and hold for the target time, then lower with control and repeat on the other side."
    ],
    "images": [
      "Side_Bridge/0.jpg",
      "Side_Bridge/1.jpg"
    ]
  },
  "Dead Bug": {
    "id": "Dead_Bug",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "abdominals"
    ],
    "secondary": [],
    "steps": [
      "Begin lying on your back with your hands extended above you toward the ceiling.",
      "Bring your feet, knees, and hips up to 90 degrees.",
      "Exhale hard to bring your ribcage down and flatten your back onto the floor, rotating your pelvis up and squeezing your glutes. Hold this position throughout the movement. This will be your starting position.",
      "Initiate the exercise by extending one leg, straightening the knee and hip to bring the leg just above the ground.",
      "Maintain the position of your lumbar and pelvis as you perform the movement, as your back is going to want to arch.",
      "Stay tight and return the working leg to the starting position.",
      "Repeat on the opposite side, alternating until the set is complete."
    ],
    "images": [
      "Dead_Bug/0.jpg",
      "Dead_Bug/1.jpg"
    ]
  },
  "Standing Hip Abduction": {
    "id": "Side_Leg_Raises",
    "equipment": "body only",
    "level": "beginner",
    "primary": [
      "abductors"
    ],
    "secondary": [
      "glutes"
    ],
    "steps": [
      "Stand tall beside a wall or chair and hold it lightly for balance. Shift your weight onto one leg with a soft knee. This will be your starting position.",
      "Keeping your torso upright and toes pointing forward, lift the free leg straight out to the side as far as you can without leaning. Breathe out and squeeze the side of your hip for a second.",
      "Lower the leg slowly back to the start without letting it rest. Repeat for the recommended repetitions, then switch sides. Tip: add an ankle weight or a band above the knees to make it harder."
    ],
    "images": [
      "Side_Leg_Raises/0.jpg",
      "Side_Leg_Raises/1.jpg"
    ]
  }
};
