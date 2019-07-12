
# coding: utf-8

# In[2]:



import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
import sys      


# In[51]:


a = pd.read_csv("data.csv",header=None)
b = pd.read_csv("test.csv")
test = np.array(b.loc[0])


# In[57]:


numpy = np.array(a) 
retval = [None] * 3                     #array for storing final result
offset = [3,2,2]            #offset for analysing different letters
x = numpy[:,:-1]                        #training data # all rows and all col without last col
y = numpy[:,-1]                         #target data  # only last col and all rows
knn_classifier = KNeighborsClassifier(n_neighbors = 3)


# In[58]:
 

i = 0
s = 0                                   #starting index for reading word
while i < 3:
    t = np.array(x[:,s:s+offset[i]])
    knn_classifier.fit(t, y)
    
    t1= np.array(test[s:s+offset[i]])
    t1=t1.reshape(1, -1)
    retval[i] = knn_classifier.predict(t1)#predcting value and storing in array 
    s = s+offset[i]
    
    i += 1;                             
                      #increasing offset for pointing to next word
    

#print(retval)
# In[61]:


i = 0
count = -1
prev = 1
store = retval[0]


retval.sort()                       #sorting predicted values for finding the most repeated person
while i < 2:
    if (retval[i] == retval[i+1]):
        prev += 1
        if(count < prev):
            store = retval[i]       #storing name of person with highest frequency
            count = prev
    else :
        prev = 1;
    i += 1
     
store=store.tolist()  
#print(type(store))         
print(store)
f=open("a.txt",'w')
f.write(store[0])
f.close()
                 #flushing value to stdout

