<html>
 <head>
  <title>
   Profile Page - Online Quiz Platform
  </title>
  <script src="https://cdn.tailwindcss.com">
  </script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&amp;display=swap" rel="stylesheet"/>
  <style>
   body {
            font-family: 'Roboto', sans-serif;
        }
  </style>
 </head>
 <body class="bg-gray-100">
  <div class="container mx-auto p-6">
   <div class="bg-white p-6 rounded-lg shadow-lg grid grid-cols-2 gap-6">
    <div>
     <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-green-600">
       Profile
      </h1>
      <button class="bg-green-600 text-white px-4 py-2 rounded-lg">
       Logout
      </button>
     </div>
     <div class="flex items-center mb-6">
      <img alt="User profile picture placeholder" class="w-24 h-24 rounded-full mr-4" height="100" src="https://storage.googleapis.com/a1aa/image/Mn7UbdilC64wOl7nPOro9bg9WbFX3g7JwVU2ry95hmFmi07E.jpg" width="100"/>
      <div>
       <h2 class="text-xl font-bold text-black">
        Username
       </h2>
       <p class="text-gray-600">
        user@example.com
       </p>
      </div>
     </div>
     <div class="mb-6">
      <h2 class="text-xl font-bold mb-4 text-black">
       Update Info
      </h2>
      <form class="space-y-4">
       <div>
        <label class="block text-gray-700">
         Username
        </label>
        <input class="w-full p-2 border border-gray-300 rounded-lg" placeholder="New Username" type="text"/>
       </div>
       <div>
        <label class="block text-gray-700">
         Password
        </label>
        <input class="w-full p-2 border border-gray-300 rounded-lg" placeholder="New Password" type="password"/>
       </div>
       <div>
        <label class="block text-gray-700">
         Profile Picture
        </label>
        <input class="w-full p-2 border border-gray-300 rounded-lg" type="file"/>
       </div>
       <button class="bg-green-600 text-white px-4 py-2 rounded-lg" type="submit">
        Update
       </button>
      </form>
     </div>
    </div>
    <!-- Created Quizzes Section -->
    <div>
     <h2 class="text-xl font-bold mb-4 text-black">
      Created Quizzes
     </h2>
     <ul class="space-y-4">
      <li class="bg-gray-100 p-4 rounded-lg flex items-center">
       <img alt="Quiz image placeholder" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/vSRir7qVueTCUiOppfmGxvDKwdFA14SECRSnftcwSus1UkeOB.jpg" width="50"/>
       <span class="flex-grow text-black">
        Quiz Title 1
       </span>
       <button class="bg-green-600 text-white px-4 py-2 rounded-lg">
        Play
       </button>
      </li>
      <li class="bg-gray-100 p-4 rounded-lg flex items-center">
       <img alt="Quiz image placeholder" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/vSRir7qVueTCUiOppfmGxvDKwdFA14SECRSnftcwSus1UkeOB.jpg" width="50"/>
       <span class="flex-grow text-black">
        Quiz Title 2
       </span>
       <button class="bg-green-600 text-white px-4 py-2 rounded-lg">
        Play
       </button>
      </li>
      <li class="bg-gray-100 p-4 rounded-lg flex items-center">
       <img alt="Quiz image placeholder" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/vSRir7qVueTCUiOppfmGxvDKwdFA14SECRSnftcwSus1UkeOB.jpg" width="50"/>
       <span class="flex-grow text-black">
        Quiz Title 3
       </span>
       <button class="bg-green-600 text-white px-4 py-2 rounded-lg">
        Play
       </button>
      </li>
     </ul>
    </div>
   </div>
   <!-- Quiz History Section -->
   <div class="bg-white p-6 rounded-lg shadow-lg mt-6">
    <h2 class="text-xl font-bold mb-4 text-black">
     Quiz History
    </h2>
    <table class="min-w-full bg-white">
     <thead>
      <tr>
       <th class="py-2 px-4 border-b border-gray-200 text-left text-black">
        Title
       </th>
       <th class="py-2 px-4 border-b border-gray-200 text-left text-black">
        Score
       </th>
       <th class="py-2 px-4 border-b border-gray-200 text-left text-black">
        Date
       </th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        Quiz Title 1
       </td>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        85%
       </td>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        2023-01-01
       </td>
      </tr>
      <tr>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        Quiz Title 2
       </td>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        90%
       </td>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        2023-01-02
       </td>
      </tr>
      <tr>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        Quiz Title 3
       </td>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        75%
       </td>
       <td class="py-2 px-4 border-b border-gray-200 text-black">
        2023-01-03
       </td>
      </tr>
     </tbody>
    </table>
   </div>
   <!-- Statistics Section -->
   <div class="bg-white p-6 rounded-lg shadow-lg mt-6">
    <h2 class="text-xl font-bold mb-4 text-black">
     Statistics
    </h2>
    <div class="bg-gray-100 p-4 rounded-lg">
     <p class="text-black">
      Total Quizzes Taken:
      <span class="font-bold">
       15
      </span>
     </p>
    </div>
   </div>
  </div>
 </body>
</html>
