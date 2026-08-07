
#include "cuda_runtime.h"
#include "device_launch_parameters.h"

#include <stdio.h>
#include <iostream>
using namespace std;

/*
#define DIM 1000

cudaError_t addWithCuda(int* c, const int* a, const int* b, unsigned int size);
void AddExample();
void JuliaExample();

struct cuComplex {
    float r;
    float i;

    __device__ cuComplex(float a, float b) : r(a), i(b) {}
    __device__ float magnitude2(void) {
        return r * r + i * i;
    }

    __device__ cuComplex operator*(const cuComplex& a) {
        return  {r * a.r - i * a.i, i * a.r + r * a.i};
    }

    __device__ cuComplex operator+(const cuComplex& a) {
        return {r + a.r, i + a.i};
    }
};

__device__ int julia(int x, int y)
{
	const float scale = 1.5;
	float jx = scale * (float)(DIM/2 - x) / (DIM/2);
	float jy = scale * (float)(DIM/2 - y) / (DIM/2);
    cuComplex c(-0.8, 0.156);
	cuComplex a(jx, jy);
	int i = 0;
	for (i = 0; i < 200; i++) {
		a = a * a + c;
		if (a.magnitude2() > 1000)
			return 0;
	}
	return 1;
}


__global__ void addKernel(int *c, const int *a, const int *b)
{
    int i = threadIdx.x;
    c[i] = a[i] + b[i];
    printf("Thread %d: %d + %d = %d\n", i, a[i], b[i], c[i]);
}

__global__ void juliaKernel(int* output)
{
	int x = blockIdx.x;
	int y = blockIdx.y;
	int offset = x + y * gridDim.x;
	output[offset * 4 + 0] = 255 * julia(x, y);
	output[offset * 4 + 1] = 0;
	output[offset * 4 + 2] = 0;
	output[offset * 4 + 3] = 255;
}

void AddExample()
{
    const int arraySize = 5;
    const int a[arraySize] = { 1, 2, 3, 4, 5 };
    const int b[arraySize] = { 10, 20, 30, 40, 50 };
    int c[arraySize] = { 0 };
    // Add vectors in parallel.
    cudaError_t cudaStatus = addWithCuda(c, a, b, arraySize);
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "addWithCuda failed!");
        return;
    }
    printf("{1,2,3,4,5} + {10,20,30,40,50} = {%d,%d,%d,%d,%d}\n",
        c[0], c[1], c[2], c[3], c[4]);
    // cudaDeviceReset must be called before exiting in order for profiling and
    // tracing tools such as Nsight and Visual Profiler to show complete traces.
    cudaStatus = cudaDeviceReset();
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaDeviceReset failed!");
        return;
    }
}

// Helper function for using CUDA to add vectors in parallel.
cudaError_t addWithCuda(int* c, const int* a, const int* b, unsigned int size)
{
    int* dev_a = 0;
    int* dev_b = 0;
    int* dev_c = 0;
    cudaError_t cudaStatus;

    // Choose which GPU to run on, change this on a multi-GPU system.
    cudaStatus = cudaSetDevice(0);
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaSetDevice failed!  Do you have a CUDA-capable GPU installed?");
        goto Error;
    }

    // Allocate GPU buffers for three vectors (two input, one output)    .
    cudaStatus = cudaMalloc((void**)&dev_c, size * sizeof(int));
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMalloc failed!");
        goto Error;
    }

    cudaStatus = cudaMalloc((void**)&dev_a, size * sizeof(int));
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMalloc failed!");
        goto Error;
    }

    cudaStatus = cudaMalloc((void**)&dev_b, size * sizeof(int));
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMalloc failed!");
        goto Error;
    }

    // Copy input vectors from host memory to GPU buffers.
    cudaStatus = cudaMemcpy(dev_a, a, size * sizeof(int), cudaMemcpyHostToDevice);
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMemcpy failed!");
        goto Error;
    }

    cudaStatus = cudaMemcpy(dev_b, b, size * sizeof(int), cudaMemcpyHostToDevice);
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMemcpy failed!");
        goto Error;
    }

    // Launch a kernel on the GPU with one thread for each element.
    addKernel << <1, size >> > (dev_c, dev_a, dev_b);

    // Check for any errors launching the kernel
    cudaStatus = cudaGetLastError();
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "addKernel launch failed: %s\n", cudaGetErrorString(cudaStatus));
        goto Error;
    }

    // cudaDeviceSynchronize waits for the kernel to finish, and returns
    // any errors encountered during the launch.
    cudaStatus = cudaDeviceSynchronize();
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaDeviceSynchronize returned error code %d after launching addKernel!\n", cudaStatus);
        goto Error;
    }

    // Copy output vector from GPU buffer to host memory.
    cudaStatus = cudaMemcpy(c, dev_c, size * sizeof(int), cudaMemcpyDeviceToHost);
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMemcpy failed!");
        goto Error;
    }

Error:
    cudaFree(dev_c);
    cudaFree(dev_a);
    cudaFree(dev_b);

    return cudaStatus;
}

void JuliaExample()
{
    // This function is a placeholder for a potential Julia example.
    // You can implement Julia-related CUDA code here if needed.
    CPUBitmap bitmap(DIM, DIM);
    unsigned char* dev_bitmap;
    cudaError_t cudaStatus = cudaMalloc((void**)&dev_bitmap, bitmap.image_size());

    dim3 grid(DIM, DIM);
    juliaKernel << <grid, 1 >> > ((int*)dev_bitmap);

    cudaStatus = cudaDeviceSynchronize();
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaDeviceSynchronize returned error code %d after launching juliaKernel!\n", cudaStatus);
        goto Error;
    }

    cudaStatus = cudaMemcpy(bitmap.get_ptr(), dev_bitmap, bitmap.image_size(), cudaMemcpyDeviceToHost);

    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMemcpy failed!");
        goto Error;
    }

    bitmap.display_and_exit();



Error:
    cudaFree(dev_bitmap);

}
*/

void DisplayDeviceProperties()
{
	int devCount;
	cudaDeviceProp deviceProp;
	cudaError_t cudaStatus = cudaGetDeviceCount(&devCount);
	for (int i = 0; i < devCount; i++)
	{
		cudaGetDeviceProperties(&deviceProp, i);
		printf("Device %d: %s\n", i, deviceProp.name);
		cout << "  Total Global Memory: " << deviceProp.totalGlobalMem << " bytes" << endl;
		cout << " Major: " << deviceProp.major << ", Minor: " << deviceProp.minor << endl;
	}
}

#define imin(a, b) (a < b ? a : b)
const int N = 33*1024;
const int ThreadPerblock = 256;
const int BlockPerGrid = imin(32, (N + ThreadPerblock - 1) / ThreadPerblock);

__global__ void dot(double* a, double* b, double* c)
{
	__shared__ double cache[ThreadPerblock];
    int tid = threadIdx.x + blockIdx.x * blockDim.x;
    int cacheIndex = threadIdx.x;

    double temp = 0;
    while(tid < N)
    {
        temp += a[tid] * b[tid];
		tid += blockDim.x * gridDim.x;
    }

    cache[cacheIndex] = temp;

    __syncthreads();

	int i = blockDim.x / 2;
    while (i != 0)
    {
        if (cacheIndex < i)
        {
			cache[cacheIndex] += cache[cacheIndex + i]; 
        }
        __syncthreads();
        i /= 2;
    }

    if (cacheIndex == 0)
    {
        c[blockIdx.x] = cache[0];
    }
}

int dotMain()
{
    double* a, * b, c, * partial_c;
    double* dev_a, * dev_b, * dev_partial_c;
    a = (double*)malloc(N * sizeof(double));
    b = (double*)malloc(N * sizeof(double));
    partial_c = (double*)malloc(BlockPerGrid * sizeof(double));

    cudaError_t cudaStatus = cudaMalloc((void**)&dev_a, N * sizeof(double));
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMalloc failed!");
        return 1;
    }
    cudaStatus = cudaMalloc((void**)&dev_b, N * sizeof(double));
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMalloc failed!");
        return 1;
    }
    cudaStatus = cudaMalloc((void**)&dev_partial_c, BlockPerGrid * sizeof(double));
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMalloc failed!");
        return 1;
    }

    for (int i = 0; i < N; i++)
    {
        a[i] = i;
        b[i] = i * 2;
    }

    cudaMemcpy(dev_a, a, N * sizeof(double), cudaMemcpyHostToDevice);
    cudaMemcpy(dev_b, b, N * sizeof(double), cudaMemcpyHostToDevice);

    dot << < BlockPerGrid, ThreadPerblock >> > (dev_a, dev_b, dev_partial_c);

    cudaStatus = cudaMemcpy(partial_c, dev_partial_c, BlockPerGrid * sizeof(double), cudaMemcpyDeviceToHost);
    if (cudaStatus != cudaSuccess) {
        fprintf(stderr, "cudaMemcpy failed!");
        return 1;
    }

    c = 0;
    for (int i = 0; i < BlockPerGrid; i++)
    {
        c += partial_c[i];
    }

#define sum_squares(x) (x * (x+1) * (2*x+1) / 6)
    printf("when N = %d, Dose: %f, sum_squares: %f\n", N, c, 2 * sum_squares((double)(N - 1)));


    free(a);
    free(b);
    free(partial_c);
    cudaFree(dev_a);
    cudaFree(dev_b);
    cudaFree(dev_partial_c);

}

int main()
{
	cudaDeviceProp deviceProp;

	int whichDevice;

	cudaError_t cudaStatus = cudaGetDevice(&whichDevice);
	if (cudaStatus != cudaSuccess) {
		fprintf(stderr, "cudaGetDevice failed!");
		return 1;
	}

	cudaStatus = cudaGetDeviceProperties(&deviceProp, whichDevice);
	if (cudaStatus != cudaSuccess) {
		fprintf(stderr, "cudaGetDeviceProperties failed!");
		return 1;
	}
    if(!deviceProp.dev)

    return 0;
}
