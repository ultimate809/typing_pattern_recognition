import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import pandas as pd
import sys      



df = pd.read_csv("data.csv",header=None)
X = df[[0,1,2,3,4,5,6]].copy(deep=True)
y = df[[7]].copy(deep=True)
test = pd.read_csv("test.csv")


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
test_scaled = scaler.transform(test)

from sklearn import preprocessing
le = preprocessing.LabelEncoder()
le.fit(y)
list(le.classes_)
y=le.transform(y)
#decode=le.inverse_transform([0,1,2,3])

pca=PCA(n_components=2)
X_reduced2 = pca.fit_transform(X_scaled)
test_reduced2=pca.transform(test_scaled)
#print(X_reduced2)

import math
import statistics

def sort_by_dist(x,y):
    sx=statistics.median(x)
    sy=statistics.median(y)
    temp=[]
    for i in range(len(x)):
        ans=math.sqrt((x[i]-sx)**2+((y[i]-sy)**2))
        temp.append(ans)
    temp.sort()
    ind=int(len(temp)*0.8)
    th=temp[ind]
    #print(ind,th)
    outx=[]
    #print(len(temp))
    outy=[]
    for i in range(len(x)):
        ans=math.sqrt((x[i]-sx)**2+((y[i]-sy)**2))
        if(ans<th):
            outx.append(x[i])
            outy.append(y[i])
            #print(ans)
    #print(outx)
    #print(outx,outy)   
    return outx,outy

import numpy as np

final_listx=[]
final_listy=[]
final_listans=[]

for i in np.unique(y):
    com_listx=[]
    com_listy=[]
    for j in range(len(X_reduced2)):
        if(y[j]==i):
            com_listx.append(X_reduced2[j][0])
            com_listy.append(X_reduced2[j][1])
    #print(len(com_listx))
    ox,oy=sort_by_dist(com_listx,com_listy)
    #print(ox)
    final_listx.extend(ox)
    final_listy.extend(oy)
   
    for j in range(len(ox)):
        final_listans.append(i)
#final_listx    
   
final_x=tuple(zip(final_listx,final_listy))
final_x=np.asarray(final_x) 
final_y=np.asarray(final_listans)

from sklearn import svm
#X_reduced2 = PCA(n_components=2).fit_transform(X_scaled)
svm = svm.SVC(C=0.5, kernel='linear')
svm.fit(final_x, final_listans)


a=np.asarray(test_reduced2)
store=svm.predict(a.reshape(1,-1))
store=le.inverse_transform(store)

print(store)
f=open("a.txt",'w')
f.write(store[0])
f.close()
sys.stdout.flush()                  #flushing value to stdout
