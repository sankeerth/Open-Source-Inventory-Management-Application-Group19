import json

f = open("inventory.json", "r")
j = json.load(f)

class Curriculum:
	def __init__(self, req, length):
		self.req = req # requirements.
		self.length = length;

class Epoch:
	def __init__(self, curriculum, start_time, duration):
		self.curriculum = curriculum;
		self.start_time = start_time;
		self.duration = duration;

class Node:
	def __init__(self, start, end, inventory):
		self.start = start; self.end = end; self.inventory = inventory;
	def split(self, first_tail): # first part: [start, first_tail]; second part: [first_tail+1 : ]
		e2 = self.end
		second_half = Node(first_tail + 1, e2, self.inventory.copy())
		self.end = first_tail;
		return (self, second_half)
	def __str__(self):
		return "[%d,%d]" % (self.start, self.end)

class Timeline:
	def __init__(self):
		self.nodes = []
		self.scheduled_lessons = []
	def findIdxByTimestamp(self, ts):
		idx = 0
		for n in self.nodes:
			if n.start <= ts and n.end >= ts: return idx
			idx += 1
		assert False
	def canDeductInventory(self, start, end, delta):
		idx0 = self.findIdxByTimestamp(start); idx1 = self.findIdxByTimestamp(end);
		for idx in xrange(idx0, idx1+1):
			n = self.nodes[idx]
			for k, v in delta.items():
				if n.inventory.has_key(k):
					if n.inventory[k] < v: 
						return False
				else:
					return False
		return True
	def deductInventoryAndLogLesson(self, start, end, delta, tag):
		# Scheduled Lesson.
		blah = delta.copy()
		blah["tag"] = tag
		blah["start"] = start
		blah["end"] = end
		self.scheduled_lessons.append(blah)
		self.deductInventory(start, end, delta)

	def deductInventory(self, start, end, delta):
		assert self.canDeductInventory(start, end, delta)
		idx0 = self.findIdxByTimestamp(start); idx1 = self.findIdxByTimestamp(end);

		n1_split = None; n0_split = None
		if idx0 == idx1:
			x = self.nodes[idx0]
			victim = None
			if start > x.start:
				if end < x.end:
					x1, x2 = x1.split(end)
					self.nodes.insert(idx0 + 1, x2)
					victim = x1
				else:
					x0, x1 = x.split(start - 1)
					self.nodes.insert(idx0 + 1, x1)
					victim = x1
			else:
				if end < x.end:
					x0, x1 = x.split(end)
					self.nodes.insert(idx0 + 1, x1)
					victim = x0
				else:
					victim = x
			for k, v in delta.items():
				assert victim.inventory.has_key(k)
				assert victim.inventory[k] >= v
				victim.inventory[k] -= v
		else:
			for idx in xrange(idx0, idx1+1):
				n = self.nodes[idx]
				if idx == idx0:
					if n.start == start:
						for k, v in delta.items():
							assert n.inventory.has_key(k)
							assert n.inventory[k] >= v
							n.inventory[k] -= v
					else:
						n, n0_split = n.split(start - 1)
						for k, v in delta.items():
							n0_split.inventory[k] -= v
				elif idx == idx1:
					if n.end == end:
						for k, v in delta.items():
							n.inventory[k] -= v
					else:
						n, n1_split = n.split(end)
						for k, v in delta.items():
							n.inventory[k] -= v
				else:
					for k, v in delta.items():
						assert n.inventory.has_key(k)
						assert n.inventory[k] >= v
						n.inventory[k] -= v
			if n1_split is not None:
				self.nodes.insert(idx1+1, n1_split)
			if n0_split is not None:
				self.nodes.insert(idx0+1, n0_split)
	def Print(self):
		print "Timeline:"
		for x in self.nodes:
			print x, str(x.inventory)
		print "Scheduled Lessons:"
		for x in self.scheduled_lessons:
			print x
	def PrintToRDataFile(self):
		# Lesson Plan Plan
		print "Plan of Lesson Plan"
		layer = 0
		f = open("lesson_plan_schedules.txt", "w")
		layout_done_idxes = set([])
		while len(layout_done_idxes) < len(self.scheduled_lessons):
			last_y = 0
			layer += 1
			for x in xrange(0, len(self.scheduled_lessons)):
				if x in layout_done_idxes: continue
				entry = self.scheduled_lessons[x]
				if entry["start"] > last_y:
					last_y = entry["end"]
					line = "%d, %d, %d, %s" % (entry["start"], entry["end"], layer, entry["tag"])
					print line
					f.write(line + "\n")
					layout_done_idxes.add(x)
		f.close()
		f = open("remaining_items.txt", "w")
		print "Remaining Inventory"
		for n in self.nodes:
			for k, v in n.inventory.items():
				line = "%d, %d, %s" % (n.start, v, k)
				print line
				f.write(line + "\n")
				if n.start != n.end:
					line = "%d, %d, %s" % (n.end, v, k)
					print line
					f.write(line + "\n")

# Mocked target function: Schedule as many recurring events as possible.

# Test 1
def test1():
	dummy = { "Item1": 10, "Item2": 11 }
	n1 = Node(1, 10, dummy);
	print n1
	(n1, n2) = n1.split(5)
	print n1
	print n2

# Test 2
def test2():
	dummy = { "Item1": 10, "Item2": 11 }
	tl = Timeline();
	n1 = Node(1, 5, dummy);
	n2 = Node(6, 10, dummy.copy());
	tl.nodes = [n1, n2]
	assert tl.canDeductInventory(2, 7, { "Item1": 10, "Item2": 11 }) == True
	assert tl.canDeductInventory(2, 7, { "Item1": 10, "Item2": 12 }) == False
	assert tl.canDeductInventory(1, 2, { "Item1": 10, "Item2": 12 }) == False
	tl.deductInventory(2, 7, {"Item1": 2, "Item2": 3})
	tl.Print()

# Test 3
def test3():
	dummy = { "Item1": 10, "Item2": 11 }
	tl = Timeline()
	LEN = 15
	n1 = Node(1, LEN, dummy);
	tl.nodes = [n1]
	req1 = { "Item1": 3, "Item2": 1}; req2 = { "Item1": 1, "Item2": 3 }
	reqs = [req1, req2]
	lens = [3, 4]
	done = False
	while not done:
		added_anything = False
		for reqidx in xrange(0, 2):
			l = lens[reqidx]; req = reqs[reqidx]
			for x in xrange(1, LEN-l+1):
				if tl.canDeductInventory(x, x+l-1, req):
					tl.deductInventoryAndLogLesson(x, x+l-1, req, "LessonPlan%d" % reqidx);
					#tl.deductInventory(x, x+l-1, req);
					added_anything = True;
					print "x=%d" % x
					tl.Print()
					break
		if added_anything == False:
			done = True;
	tl.Print()
	tl.PrintToRDataFile()

test3()
