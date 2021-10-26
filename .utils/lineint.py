import numpy as np

def paramterise(t):
    x = np.cos(t)
    y = np.sin(t)
    z = 0
    return np.array((x, y, z))

C = []  # rᵢ ∈ C
for t in np.arange(0, np.pi, 0.0001):
    C.append(paramterise(t))

dC = []  # drᵢ ∈ dC
for i, r in enumerate(C):
    if i + 1 == len(C): break
    # r[i] + dr[i] = r[i+1]
    dC.append(C[i + 1] - r)

C.pop()  # no longer useful.

F = lambda r: np.array((r[0], r[1], 0))

integral = 0
for (r, dr) in zip(C, dC):
    integral += np.cross(r, dr)

print(f"Line integral: {integral}")
