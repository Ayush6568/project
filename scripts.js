const numBars = 50;
const arr = [];
const container = document.querySelector('.array-container');

// Generate an initial random array and display it
for (let i = 0; i < numBars; i++) {
    arr.push(Math.floor(Math.random() * 350) + 50);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = arr[i] + 'px';
    container.appendChild(bar);
}

function redrawBars() {
    const bars = container.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.height = arr[index] + 'px';
    });
}

async function bubbleSort() {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                redrawBars();
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }
}
async function selectionSort() {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            redrawBars();
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}
async function insertionSort() {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;

        redrawBars();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}
async function merge(left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 25));  // visualization delay
        redrawBars();
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

async function mergeSortRecursive(left, right) {
    if (left < right) {
        let mid = left + Math.floor((right - left) / 2);

        await mergeSortRecursive(left, mid);
        await mergeSortRecursive(mid + 1, right);

        await merge(left, mid, right);
    }
}
async function mergeSort() {
    await mergeSortRecursive(0, arr.length - 1);
}
function startSorting() {
    const algorithm = document.getElementById('algorithm').value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'mergeSort':
            mergeSort();
            break;
    }
}
