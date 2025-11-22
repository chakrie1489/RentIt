# RentIt Request API Documentation

## Base URL
```
http://localhost:4000/api/requests
```

## Authentication
All endpoints require a valid JWT token in the `token` header:
```
headers: { token: 'your-jwt-token' }
```

---

## Endpoints

### 1. Create Request
**Create a new rental request for an item**

```
POST /api/requests/:itemId
```

**Request Body:**
```json
{
  "start": "2025-11-20T10:00:00",
  "end": "2025-11-22T10:00:00",
  "message": "I need this for an event",
  "proposedPrice": 50,
  "itemDetails": "Preferably with all accessories",
  "requesterPhone": "+1 (555) 123-4567",
  "requesterNotes": "Available for pickup on weekdays"
}
```

**Response (Success):**
```json
{
  "success": true,
  "request": {
    "_id": "6734abc123def456",
    "item": {
      "_id": "6734abc123def789",
      "title": "Camera Equipment",
      "price": 100,
      "priceUnit": "day"
    },
    "requester": {
      "_id": "user123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "start": "2025-11-20T10:00:00.000Z",
    "end": "2025-11-22T10:00:00.000Z",
    "hours": 48,
    "proposedPrice": 50,
    "status": "pending",
    "message": "I need this for an event",
    "createdAt": "2025-11-19T15:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Item not available" | "End date must be after start date" | "Item not found"
}
```

---

### 2. Respond to Request
**Accept or decline a rental request (owner only)**

```
PATCH /api/requests/:requestId
```

**Request Body:**
```json
{
  "action": "accept"  // or "decline"
}
```

**Response (Success):**
```json
{
  "success": true,
  "request": {
    "_id": "6734abc123def456",
    "status": "accepted",
    "item": {
      "_id": "6734abc123def789",
      "title": "Camera Equipment",
      "available": false
    }
  },
  "message": "Request accepted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Request not found" | "You are not the owner of this item" | "Invalid action"
}
```

---

### 3. Get My Requests
**Get all outgoing requests made by current user**

```
GET /api/requests/user/my
```

**Response (Success):**
```json
{
  "success": true,
  "requests": [
    {
      "_id": "6734abc123def456",
      "item": {
        "_id": "6734abc123def789",
        "title": "Camera Equipment",
        "price": 100,
        "priceUnit": "day"
      },
      "requester": {
        "_id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "start": "2025-11-20T10:00:00.000Z",
      "end": "2025-11-22T10:00:00.000Z",
      "hours": 48,
      "proposedPrice": 50,
      "status": "pending",
      "message": "I need this for an event",
      "createdAt": "2025-11-19T15:30:00.000Z"
    }
  ]
}
```

---

### 4. Get Owner Requests
**Get all incoming requests for items owned by current user**

```
GET /api/requests/owner/my
```

**Response (Success):**
```json
{
  "success": true,
  "requests": [
    {
      "_id": "6734abc123def456",
      "item": {
        "_id": "6734abc123def789",
        "title": "Camera Equipment",
        "price": 100,
        "priceUnit": "day"
      },
      "requester": {
        "_id": "user456",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "+1 (555) 987-6543"
      },
      "start": "2025-11-20T10:00:00.000Z",
      "end": "2025-11-22T10:00:00.000Z",
      "hours": 48,
      "proposedPrice": 50,
      "status": "pending",
      "message": "I need this for an event",
      "createdAt": "2025-11-19T15:30:00.000Z"
    }
  ]
}
```

---

### 5. Get Request Details
**Get specific request details**

```
GET /api/requests/:requestId
```

**Response (Success):**
```json
{
  "success": true,
  "request": {
    "_id": "6734abc123def456",
    "item": {
      "_id": "6734abc123def789",
      "title": "Camera Equipment",
      "price": 100,
      "priceUnit": "day",
      "owner": {
        "_id": "user123",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1 (555) 123-4567"
      }
    },
    "requester": {
      "_id": "user456",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1 (555) 987-6543"
    },
    "start": "2025-11-20T10:00:00.000Z",
    "end": "2025-11-22T10:00:00.000Z",
    "hours": 48,
    "proposedPrice": 50,
    "status": "pending",
    "message": "I need this for an event",
    "itemDetails": "Preferably with all accessories",
    "requesterNotes": "Available for pickup on weekdays",
    "createdAt": "2025-11-19T15:30:00.000Z"
  }
}
```

---

### 6. Cancel Request
**Cancel a pending request (by requester only)**

```
DELETE /api/requests/:requestId
```

**Response (Success):**
```json
{
  "success": true,
  "request": {
    "_id": "6734abc123def456",
    "status": "cancelled"
  },
  "message": "Request cancelled"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Request not found" | "You can only cancel your own requests" | "Cannot cancel a accepted request"
}
```

---

## Request Status Values
- `pending` - Request is awaiting response from owner
- `accepted` - Owner has accepted the request
- `declined` - Owner has declined the request
- `cancelled` - Requester has cancelled the request

---

## Error Codes

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Item not available | The item is not available for requests |
| 400 | End date must be after start date | Invalid date range |
| 400 | Invalid action | Action must be 'accept' or 'decline' |
| 403 | You are not the owner of this item | Only item owner can respond |
| 403 | You can only cancel your own requests | Only requester can cancel |
| 404 | Request not found | Request ID does not exist |
| 404 | Item not found | Item ID does not exist |
| 500 | Internal Server Error | Server error |

---

## Example Usage

### Using Fetch API:

```javascript
// Create a request
const createRequest = async (itemId, data) => {
  const response = await fetch(`/api/requests/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

// Get my requests
const getMyRequests = async () => {
  const response = await fetch('/api/requests/user/my', {
    headers: { 'token': localStorage.getItem('token') }
  });
  return response.json();
};

// Accept a request
const acceptRequest = async (requestId) => {
  const response = await fetch(`/api/requests/${requestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    },
    body: JSON.stringify({ action: 'accept' })
  });
  return response.json();
};
```

### Using Axios (as implemented in the frontend):

```javascript
import axios from 'axios';

const backendUrl = 'http://localhost:4000';
const client = axios.create({ baseURL: backendUrl });

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { headers: { token } } : {};
}

// Create request
export async function createRequest(itemId, body) {
  const res = await client.post(`/api/requests/${itemId}`, body, authHeaders());
  return res.data;
}

// Get my requests
export async function getMyRequests() {
  const res = await client.get(`/api/requests/user/my`, authHeaders());
  return res.data;
}

// Get owner requests
export async function getOwnerRequests() {
  const res = await client.get(`/api/requests/owner/my`, authHeaders());
  return res.data;
}

// Respond to request
export async function respondRequest(requestId, action) {
  const res = await client.patch(`/api/requests/${requestId}`, { action }, authHeaders());
  return res.data;
}
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Hours are calculated as the difference between end and start dates in hours
- Item becomes unavailable when a request is accepted
- Users can have multiple pending requests for different items
- Proposed price overrides the listed item price if provided
- All text fields have character limits enforced at the database level

---

**Last Updated:** November 19, 2025
**API Version:** v1
