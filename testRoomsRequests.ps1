# Example PowerShell requests for Rooms API
# Adjust host/credentials as needed. Run in PowerShell.

# Base URL for the API
$base = "http://localhost:3000"

# 1) Login to obtain JWT token (use an existing user)
$login = Invoke-RestMethod -Method POST -Uri "$base/api/auth/login" -ContentType "application/json" -Body '{
  "email": "dev@example.com",
  "password": "temp"
}'
$token = $login.token

# Authorization header
$headers = @{ Authorization = "Bearer $token" }

# 2) Create a room (POST /api/rooms)
Invoke-RestMethod -Method POST -Uri "$base/api/rooms" -Headers $headers -ContentType "application/json" -Body '{
  "roomName": "Living Room",
  "decorationID": null,
  "upperTemp": 25,
  "lowerTemp": 18,
  "lightLevel": 3,
  "humidity": 50
}'

# Response will include { roomID: <id> } — save it if needed

# 3) List user's rooms (GET /api/rooms)
Invoke-RestMethod -Method GET -Uri "$base/api/rooms" -Headers $headers

# 4) Get a specific room with plants (GET /api/rooms/:id)
# Replace 1 with the actual roomID returned above
Invoke-RestMethod -Method GET -Uri "$base/api/rooms/1" -Headers $headers

# 5) Add a plant to a room (POST /api/rooms/:id/plants)
# Note: use a valid plantID from your `plant` table. Response returns { userPlantID: <id> }
Invoke-RestMethod -Method POST -Uri "$base/api/rooms/1/plants" -Headers $headers -ContentType "application/json" -Body '{
  "plantID": 1,
  "plantName": "Fiddle Leaf #1"
}'

# 6) List plants in a room (GET /api/rooms/:id/plants)
Invoke-RestMethod -Method GET -Uri "$base/api/rooms/1/plants" -Headers $headers

# 7) Update a room (PATCH /api/rooms/:id)
Invoke-RestMethod -Method Patch -Uri "$base/api/rooms/1" -Headers $headers -ContentType "application/json" -Body '{
  "roomName": "Updated Living Room",
  "humidity": 55
}'

# 8) Update a user plant (PATCH /api/rooms/:id/plants/:plantId)
# Replace :plantId with the userPlantID returned when adding the plant
Invoke-RestMethod -Method Patch -Uri "$base/api/rooms/1/plants/1" -Headers $headers -ContentType "application/json" -Body '{
  "plantName": "Renamed Plant"
}'

# 9) Remove a user plant (DELETE /api/rooms/:id/plants/:plantId)
Invoke-RestMethod -Method Delete -Uri "$base/api/rooms/1/plants/1" -Headers $headers

# 10) Delete a room (DELETE /api/rooms/:id)
# Note: deletion will fail if the room still contains plants — remove them first
Invoke-RestMethod -Method Delete -Uri "$base/api/rooms/1" -Headers $headers
